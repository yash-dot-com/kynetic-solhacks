use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
declare_id!("E75cjuzKUcP79xMRTzWG2EoPRXiRyzkGpo9BBoG7uJ5r");
const MAX_METADATA: usize = 4096;
const DRAFT: u8 = 0; const OPEN: u8 = 1; const SETTLED: u8 = 2; const CANCELLED: u8 = 3;
#[program]
pub mod kynetic_bounty {
 use super::*;
 pub fn initialize_bounty(ctx: Context<InitializeBounty>, nonce: u64, reward_pool: u64, entry_stake: u64, deadline: i64, metadata_hash: [u8;32], metadata_len: u16) -> Result<()> {
  require!(reward_pool > 0, BountyError::InvalidAmount);
  require!(deadline > Clock::get()?.unix_timestamp, BountyError::InvalidDeadline);
  require!(metadata_len > 0 && metadata_len as usize <= MAX_METADATA, BountyError::InvalidMetadata);
  let b = &mut ctx.accounts.bounty; b.host = ctx.accounts.host.key(); b.nonce = nonce; b.reward_pool = reward_pool; b.entry_stake = entry_stake; b.deadline = deadline; b.metadata_hash = metadata_hash; b.metadata_len = metadata_len; b.bump = ctx.bumps.bounty;
  Ok(())
 }
 pub fn append_metadata(ctx: Context<HostBounty>, offset: u16, chunk: Vec<u8>) -> Result<()> {
  let b=&mut ctx.accounts.bounty; require!(b.status==DRAFT, BountyError::WrongState); require!(offset as usize==b.metadata.len(),BountyError::InvalidOffset);
  require!(!chunk.is_empty() && chunk.len()<=600,BountyError::InvalidMetadata);
  let end=b.metadata.len().checked_add(chunk.len()).ok_or(BountyError::Overflow)?; require!(end<=b.metadata_len as usize,BountyError::InvalidMetadata); b.metadata.extend_from_slice(&chunk); Ok(())
 }
 pub fn fund_bounty(ctx: Context<FundBounty>) -> Result<()> {
  let b=&ctx.accounts.bounty; require!(b.status==DRAFT,BountyError::WrongState); require!(b.deadline>Clock::get()?.unix_timestamp,BountyError::InvalidDeadline);
  require!(b.metadata.len()==b.metadata_len as usize,BountyError::InvalidMetadata);
  require!(solana_sha256_hasher::hash(&b.metadata).to_bytes()==b.metadata_hash,BountyError::InvalidMetadata);
  transfer(CpiContext::new(ctx.accounts.system_program.key(),Transfer{from:ctx.accounts.host.to_account_info(),to:b.to_account_info()}),b.reward_pool)?;
  ctx.accounts.bounty.status=OPEN; emit!(BountyFunded{bounty:ctx.accounts.bounty.key(),host:ctx.accounts.host.key(),amount:ctx.accounts.bounty.reward_pool}); Ok(())
 }
 pub fn enter_bounty(ctx: Context<EnterBounty>) -> Result<()> {
  let b=&mut ctx.accounts.bounty; require!(b.status==OPEN,BountyError::WrongState); require!(Clock::get()?.unix_timestamp<b.deadline,BountyError::EntryClosed);
  let e=&mut ctx.accounts.entry; e.bounty=b.key(); e.curator=ctx.accounts.curator.key(); e.stake=b.entry_stake; e.bump=ctx.bumps.entry; b.entries=b.entries.checked_add(1).ok_or(BountyError::Overflow)?;
  if b.entry_stake>0 { transfer(CpiContext::new(ctx.accounts.system_program.key(),Transfer{from:ctx.accounts.curator.to_account_info(),to:e.to_account_info()}),b.entry_stake)?; } Ok(())
 }
 // Evaluation remains host-attested off-chain; the contract enforces allocation math.
 pub fn record_evaluation(ctx: Context<RecordEvaluation>, gain: u64) -> Result<()> {
  let b=&mut ctx.accounts.bounty; let e=&mut ctx.accounts.entry; require!(b.status==OPEN,BountyError::WrongState); require!(Clock::get()?.unix_timestamp>=b.deadline,BountyError::TooEarly);
  if !e.evaluated { b.evaluated=b.evaluated.checked_add(1).ok_or(BountyError::Overflow)?; }
  b.total_gain=b.total_gain.checked_sub(e.gain).and_then(|n|n.checked_add(gain)).ok_or(BountyError::Overflow)?;
  if e.gain==0 && gain>0 { b.positive_entries=b.positive_entries.checked_add(1).ok_or(BountyError::Overflow)?; }
  if e.gain>0 && gain==0 { b.positive_entries=b.positive_entries.checked_sub(1).ok_or(BountyError::Overflow)?; }
  e.gain=gain; e.evaluated=true; Ok(())
 }
 pub fn settle_bounty(ctx: Context<HostBounty>) -> Result<()> {
  let b=&ctx.accounts.bounty; require!(b.status==OPEN,BountyError::WrongState); require!(Clock::get()?.unix_timestamp>=b.deadline,BountyError::TooEarly); require!(b.evaluated==b.entries,BountyError::MissingEvaluations);
  if b.total_gain==0 { move_lamports(&b.to_account_info(),&ctx.accounts.host.to_account_info(),b.reward_pool)?; ctx.accounts.bounty.total_paid=ctx.accounts.bounty.reward_pool; }
  ctx.accounts.bounty.status=SETTLED; Ok(())
 }
 pub fn claim_reward(ctx: Context<CuratorEntry>) -> Result<()> {
  let b=&mut ctx.accounts.bounty; let e=&mut ctx.accounts.entry; require!(b.status==SETTLED && b.total_gain>0,BountyError::WrongState); require!(e.evaluated && e.gain>0 && !e.reward_claimed,BountyError::NothingToClaim);
  let amount=proportional_reward(b.reward_pool,e.gain,b.total_gain)?; b.total_paid=b.total_paid.checked_add(amount).ok_or(BountyError::Overflow)?; require!(b.total_paid<=b.reward_pool,BountyError::InvalidAmount); b.claims=b.claims.checked_add(1).ok_or(BountyError::Overflow)?; e.reward_claimed=true;
  move_lamports(&b.to_account_info(),&ctx.accounts.curator.to_account_info(),amount)?; Ok(())
 }
 pub fn refund_stake(ctx: Context<CuratorEntry>) -> Result<()> {
  let e=&mut ctx.accounts.entry; require!(Clock::get()?.unix_timestamp>=ctx.accounts.bounty.deadline || ctx.accounts.bounty.status==CANCELLED,BountyError::TooEarly); require!(!e.stake_refunded,BountyError::NothingToClaim); e.stake_refunded=true; move_lamports(&e.to_account_info(),&ctx.accounts.curator.to_account_info(),e.stake)?; Ok(())
 }
 pub fn cancel_bounty(ctx: Context<HostBounty>) -> Result<()> {
  let b=&ctx.accounts.bounty; require!(b.status==OPEN && b.entries==0,BountyError::CannotCancel); move_lamports(&b.to_account_info(),&ctx.accounts.host.to_account_info(),b.reward_pool)?; ctx.accounts.bounty.status=CANCELLED; ctx.accounts.bounty.total_paid=ctx.accounts.bounty.reward_pool; Ok(())
 }
 pub fn sweep_rounding_dust(ctx: Context<HostBounty>) -> Result<()> {
  let b=&ctx.accounts.bounty; require!(b.status==SETTLED && b.claims==b.positive_entries,BountyError::PendingClaims); let dust=b.reward_pool.checked_sub(b.total_paid).ok_or(BountyError::Overflow)?; move_lamports(&b.to_account_info(),&ctx.accounts.host.to_account_info(),dust)?; ctx.accounts.bounty.total_paid=ctx.accounts.bounty.reward_pool; Ok(())
 }
 pub fn close_draft(_ctx: Context<CloseDraft>) -> Result<()> { Ok(()) }
}
fn proportional_reward(pool:u64,gain:u64,total:u64)->Result<u64>{ require!(total>0 && gain<=total,BountyError::InvalidAmount); u64::try_from((pool as u128).checked_mul(gain as u128).ok_or(BountyError::Overflow)?/total as u128).map_err(|_|error!(BountyError::Overflow)) }
fn move_lamports(source:&AccountInfo,destination:&AccountInfo,amount:u64)->Result<()>{ let rent=Rent::get()?.minimum_balance(source.data_len()); require!(source.lamports().checked_sub(amount).filter(|n|*n>=rent).is_some(),BountyError::InvalidAmount); let balance=destination.lamports().checked_add(amount).ok_or(BountyError::Overflow)?; **source.try_borrow_mut_lamports()?-=amount; **destination.try_borrow_mut_lamports()?=balance; Ok(()) }
#[derive(Accounts)]
#[instruction(nonce:u64)]
pub struct InitializeBounty<'info>{
 #[account(mut)] pub host:Signer<'info>,
 #[account(init,payer=host,space=8+Bounty::SPACE,seeds=[b"bounty",host.key().as_ref(),&nonce.to_le_bytes()],bump)] pub bounty:Account<'info,Bounty>,
 pub system_program:Program<'info,System>,
}
#[derive(Accounts)]
pub struct HostBounty<'info>{
 #[account(mut)] pub host:Signer<'info>,
 #[account(mut,has_one=host,seeds=[b"bounty",host.key().as_ref(),&bounty.nonce.to_le_bytes()],bump=bounty.bump)] pub bounty:Account<'info,Bounty>,
}
#[derive(Accounts)]
pub struct FundBounty<'info>{
 #[account(mut)] pub host:Signer<'info>,
 #[account(mut,has_one=host,seeds=[b"bounty",host.key().as_ref(),&bounty.nonce.to_le_bytes()],bump=bounty.bump)] pub bounty:Account<'info,Bounty>,
 pub system_program:Program<'info,System>,
}
#[derive(Accounts)]
pub struct EnterBounty<'info>{
 #[account(mut)] pub curator:Signer<'info>,
 #[account(mut,seeds=[b"bounty",bounty.host.as_ref(),&bounty.nonce.to_le_bytes()],bump=bounty.bump)] pub bounty:Account<'info,Bounty>,
 #[account(init,payer=curator,space=8+Entry::SPACE,seeds=[b"entry",bounty.key().as_ref(),curator.key().as_ref()],bump)] pub entry:Account<'info,Entry>,
 pub system_program:Program<'info,System>,
}
#[derive(Accounts)]
pub struct RecordEvaluation<'info>{
 pub host:Signer<'info>,
 #[account(mut,has_one=host,seeds=[b"bounty",host.key().as_ref(),&bounty.nonce.to_le_bytes()],bump=bounty.bump)] pub bounty:Account<'info,Bounty>,
 #[account(mut,has_one=bounty,seeds=[b"entry",bounty.key().as_ref(),entry.curator.as_ref()],bump=entry.bump)] pub entry:Account<'info,Entry>,
}
#[derive(Accounts)]
pub struct CuratorEntry<'info>{
 #[account(mut)] pub curator:Signer<'info>,
 #[account(mut,seeds=[b"bounty",bounty.host.as_ref(),&bounty.nonce.to_le_bytes()],bump=bounty.bump)] pub bounty:Account<'info,Bounty>,
 #[account(mut,has_one=bounty,has_one=curator,seeds=[b"entry",bounty.key().as_ref(),curator.key().as_ref()],bump=entry.bump)] pub entry:Account<'info,Entry>,
}
#[derive(Accounts)]
pub struct CloseDraft<'info>{
 #[account(mut)] pub host:Signer<'info>,
 #[account(mut,close=host,has_one=host,constraint=bounty.status==DRAFT @ BountyError::WrongState,seeds=[b"bounty",host.key().as_ref(),&bounty.nonce.to_le_bytes()],bump=bounty.bump)] pub bounty:Account<'info,Bounty>,
}
#[account]
pub struct Bounty{pub host:Pubkey,pub nonce:u64,pub reward_pool:u64,pub entry_stake:u64,pub deadline:i64,pub metadata_hash:[u8;32],pub metadata_len:u16,pub metadata:Vec<u8>,pub status:u8,pub entries:u32,pub evaluated:u32,pub positive_entries:u32,pub total_gain:u64,pub total_paid:u64,pub claims:u32,pub bump:u8}
impl Bounty{pub const SPACE:usize=32+8+8+8+8+32+2+4+MAX_METADATA+1+4+4+4+8+8+4+1;}
#[account]
pub struct Entry{pub bounty:Pubkey,pub curator:Pubkey,pub stake:u64,pub gain:u64,pub evaluated:bool,pub stake_refunded:bool,pub reward_claimed:bool,pub bump:u8}
impl Entry{pub const SPACE:usize=32+32+8+8+1+1+1+1;}
#[event]
pub struct BountyFunded{pub bounty:Pubkey,pub host:Pubkey,pub amount:u64}
#[error_code]
pub enum BountyError{
 #[msg("Invalid amount or insufficient escrow funds")] InvalidAmount,
 #[msg("Deadline must be in the future")] InvalidDeadline,
 #[msg("Metadata is incomplete, too large, or has an invalid hash")] InvalidMetadata,
 #[msg("Metadata offset does not match uploaded bytes")] InvalidOffset,
 #[msg("Bounty is not in the required state")] WrongState,
 #[msg("Entry deadline has passed")] EntryClosed,
 #[msg("Submission deadline has not passed")] TooEarly,
 #[msg("Every entrant needs an evaluation before settlement")] MissingEvaluations,
 #[msg("Already claimed or zero reward")] NothingToClaim,
 #[msg("Cannot cancel a bounty with entrants")] CannotCancel,
 #[msg("Contributors still have unclaimed rewards")] PendingClaims,
 #[msg("Arithmetic overflow")] Overflow,
}
#[cfg(test)]
mod tests{
 use super::*;
 #[test] fn rewards_are_proportional(){assert_eq!(proportional_reward(12_000_000_000,18_000,36_000).unwrap(),6_000_000_000);assert_eq!(proportional_reward(12_000_000_000,0,36_000).unwrap(),0);}
 #[test] fn rounding_cannot_overpay(){let paid:u64=[1,1,1].iter().map(|g|proportional_reward(10,*g,3).unwrap()).sum();assert_eq!(paid,9);}
 #[test] fn large_pools(){assert_eq!(proportional_reward(u64::MAX,2,2).unwrap(),u64::MAX);}
 #[test] fn invalid_totals(){assert!(proportional_reward(10,1,0).is_err());assert!(proportional_reward(10,4,3).is_err());}
}
