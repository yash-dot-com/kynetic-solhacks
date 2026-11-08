import {
  AccountRole,
  address,
  createSolanaRpc,
  getAddressDecoder,
  getAddressEncoder,
  getProgramDerivedAddress,
  type Address,
  type AccountMeta,
  type Instruction,
  type TransactionSigner,
} from "@solana/kit";
import type { Bounty, BountyCategory } from "../challenges/bounties";

export const BOUNTY_PROGRAM = address(
  "E75cjuzKUcP79xMRTzWG2EoPRXiRyzkGpo9BBoG7uJ5r"
);
export const BOUNTY_NETWORK = "devnet" as const;
export const BOUNTY_RPC = "https://api.devnet.solana.com";
export const MAX_METADATA_BYTES = 4096;
export const BOUNTY_ACCOUNT_BYTES = 4240;
const SYSTEM = address("11111111111111111111111111111111");
export const bountyRpc = () => createSolanaRpc(BOUNTY_RPC);
export type BountySpec = {
  title: string;
  category: string;
  description: string;
  model: string;
  metric: string;
  direction: string;
  baseline: string;
  target: string;
  pool: string;
  stake: string;
  deadline: string;
  format: string;
  requirements: string;
  evaluation: string;
  host: string;
};
export type OnchainBounty = {
  address: Address;
  host: Address;
  nonce: bigint;
  pool: bigint;
  stake: bigint;
  deadline: bigint;
  metadataHash: Uint8Array;
  metadataLength: number;
  metadata: Uint8Array;
  spec: BountySpec | null;
  status: number;
  entries: number;
  evaluated: number;
  positiveEntries: number;
  totalGain: bigint;
  totalPaid: bigint;
  claims: number;
};
export const DISCRIMINATORS = {
  initialize_bounty: [150, 37, 249, 246, 85, 164, 253, 229],
  append_metadata: [240, 116, 186, 93, 219, 68, 222, 199],
  fund_bounty: [36, 148, 139, 239, 172, 37, 58, 255],
  enter_bounty: [182, 35, 28, 107, 109, 1, 1, 35],
  record_evaluation: [6, 188, 15, 253, 99, 31, 113, 216],
  settle_bounty: [13, 241, 160, 115, 118, 85, 29, 254],
  claim_reward: [149, 95, 181, 242, 94, 90, 158, 162],
  refund_stake: [185, 80, 20, 3, 110, 92, 178, 240],
  cancel_bounty: [79, 65, 107, 143, 128, 165, 135, 46],
  close_draft: [79, 18, 68, 238, 240, 145, 233, 67],
  sweep_rounding_dust: [187, 43, 189, 94, 199, 194, 185, 177],
} as const;
const accountDiscriminator = [237, 16, 105, 198, 19, 69, 242, 234];
export const utf8 = (text: string) => new TextEncoder().encode(text);
export const joinBytes = (...values: Uint8Array[]) => {
  const result = new Uint8Array(
    values.reduce((n, value) => n + value.length, 0)
  );
  let offset = 0;
  for (const value of values) {
    result.set(value, offset);
    offset += value.length;
  }
  return result;
};
export function unsigned(value: bigint | number, size = 8) {
  const bytes = new Uint8Array(size);
  const view = new DataView(bytes.buffer);
  if (size === 8) view.setBigUint64(0, BigInt(value), true);
  else if (size === 4) view.setUint32(0, Number(value), true);
  else view.setUint16(0, Number(value), true);
  return bytes;
}
export function solToLamports(value: string): bigint {
  if (!/^\d+(\.\d{1,9})?$/.test(value.trim()))
    throw new Error(
      "Use a non-negative SOL amount with at most 9 decimal places."
    );
  const [whole, fractional = ""] = value.trim().split(".");
  const result =
    BigInt(whole) * 1_000_000_000n + BigInt(fractional.padEnd(9, "0"));
  if (result > 18_446_744_073_709_551_615n)
    throw new Error("SOL amount is too large.");
  return result;
}
export const solAmount = (value: bigint) =>
  `${value / 1_000_000_000n}.${(value % 1_000_000_000n).toString().padStart(9, "0")}`.replace(
    /\.?0+$/,
    ""
  );
export async function hashSpec(bytes: Uint8Array) {
  return new Uint8Array(
    await crypto.subtle.digest("SHA-256", new Uint8Array(bytes).buffer)
  );
}
export const bytesHex = (bytes: Uint8Array) =>
  [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
export async function bountyAddress(host: Address, nonce: bigint) {
  return (
    await getProgramDerivedAddress({
      programAddress: BOUNTY_PROGRAM,
      seeds: [
        utf8("bounty"),
        getAddressEncoder().encode(host),
        unsigned(nonce),
      ],
    })
  )[0];
}
export async function entryAddress(bounty: Address, curator: Address) {
  return (
    await getProgramDerivedAddress({
      programAddress: BOUNTY_PROGRAM,
      seeds: [
        utf8("entry"),
        getAddressEncoder().encode(bounty),
        getAddressEncoder().encode(curator),
      ],
    })
  )[0];
}
export function instruction(
  name: keyof typeof DISCRIMINATORS,
  signer: TransactionSigner,
  bounty: Address,
  args = new Uint8Array(),
  entry?: Address
): Instruction {
  const accounts: Array<AccountMeta & { signer?: TransactionSigner }> = [
    { address: signer.address, role: AccountRole.WRITABLE_SIGNER, signer },
    { address: bounty, role: AccountRole.WRITABLE },
  ];
  if (entry) accounts.push({ address: entry, role: AccountRole.WRITABLE });
  if (["initialize_bounty", "fund_bounty", "enter_bounty"].includes(name))
    accounts.push({ address: SYSTEM, role: AccountRole.READONLY });
  return {
    programAddress: BOUNTY_PROGRAM,
    accounts,
    data: joinBytes(Uint8Array.from(DISCRIMINATORS[name]), args),
  };
}
export function decodeBounty(key: Address, data: Uint8Array): OnchainBounty {
  if (
    data.length < 140 ||
    !accountDiscriminator.every((byte, i) => data[i] === byte)
  )
    throw new Error("This is not a Kynetic bounty account.");
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let offset = 8;
  const read64 = () => {
    const value = view.getBigUint64(offset, true);
    offset += 8;
    return value;
  };
  const read32 = () => {
    const value = view.getUint32(offset, true);
    offset += 4;
    return value;
  };
  const host = getAddressDecoder().decode(data.slice(offset, offset + 32));
  offset += 32;
  const nonce = read64(),
    pool = read64(),
    stake = read64();
  const deadline = view.getBigInt64(offset, true);
  offset += 8;
  const metadataHash = data.slice(offset, offset + 32);
  offset += 32;
  const metadataLength = view.getUint16(offset, true);
  offset += 2;
  const length = read32();
  if (length > MAX_METADATA_BYTES || offset + length + 34 > data.length)
    throw new Error("Invalid bounty metadata length.");
  const metadata = data.slice(offset, offset + length);
  offset += length;
  const status = data[offset++],
    entries = read32(),
    evaluated = read32(),
    positiveEntries = read32(),
    totalGain = read64(),
    totalPaid = read64(),
    claims = read32();
  let spec: BountySpec | null = null;
  try {
    const parsed = JSON.parse(new TextDecoder().decode(metadata));
    const keys = [
      "title",
      "category",
      "description",
      "model",
      "metric",
      "direction",
      "baseline",
      "target",
      "pool",
      "stake",
      "deadline",
      "format",
      "requirements",
      "evaluation",
      "host",
    ];
    if (keys.every((name) => typeof parsed[name] === "string"))
      spec = parsed as BountySpec;
  } catch {
    /* Partially uploaded drafts are readable and resumable. */
  }
  return {
    address: key,
    host,
    nonce,
    pool,
    stake,
    deadline,
    metadataHash,
    metadataLength,
    metadata,
    spec,
    status,
    entries,
    evaluated,
    positiveEntries,
    totalGain,
    totalPaid,
    claims,
  };
}
const fromBase64 = (encoded: string) =>
  Uint8Array.from(atob(encoded), (ch) => ch.charCodeAt(0));
export async function fetchBounty(key: Address) {
  const { value } = await bountyRpc()
    .getAccountInfo(key, { encoding: "base64", commitment: "confirmed" })
    .send();
  if (!value) return null;
  if (value.owner !== BOUNTY_PROGRAM)
    throw new Error("Unexpected bounty account owner.");
  const bounty = decodeBounty(key, fromBase64(value.data[0]));
  if (
    bounty.spec &&
    bytesHex(await hashSpec(bounty.metadata)) !== bytesHex(bounty.metadataHash)
  )
    throw new Error("Bounty specifications do not match their on-chain hash.");
  return bounty;
}
export async function fetchFundedBounties(): Promise<Bounty[]> {
  const records = await bountyRpc()
    .getProgramAccounts(BOUNTY_PROGRAM, {
      encoding: "base64",
      commitment: "confirmed",
      filters: [{ dataSize: BigInt(BOUNTY_ACCOUNT_BYTES) }],
    })
    .send();
  const result: Bounty[] = [];
  for (const record of records) {
    try {
      const bounty = decodeBounty(
        record.pubkey,
        fromBase64(record.account.data[0])
      );
      const spec = bounty.spec;
      if (
        bounty.status !== 1 ||
        !spec ||
        bytesHex(await hashSpec(bounty.metadata)) !==
          bytesHex(bounty.metadataHash)
      )
        continue;
      if (!["LLMs", "VLMs", "Robot Perception"].includes(spec.category))
        continue;
      result.push({
        id: bounty.address,
        title: spec.title,
        category: spec.category as BountyCategory,
        host: spec.host,
        initials: spec.host
          .split(/\s+/)
          .slice(0, 2)
          .map((name) => name[0])
          .join(""),
        description: spec.description,
        model: spec.model,
        metric: spec.metric,
        baseline: Number(spec.baseline),
        target: Number(spec.target),
        pool: Number(bounty.pool) / 1e9,
        stake: Number(bounty.stake) / 1e9,
        contributors: bounty.entries,
        deadline: new Date(Number(bounty.deadline) * 1000).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric", timeZone: "UTC" }
        ),
        format: spec.format,
      });
    } catch {
      /* Ignore accounts that are not fully published bounty records. */
    }
  }
  return result;
}
export const bountyExplorer = (path: string) =>
  `https://explorer.solana.com/${path}?cluster=devnet`;

export type OnchainEntry = {
  address: Address;
  bounty: Address;
  curator: Address;
  stake: bigint;
  gain: bigint;
  evaluated: boolean;
  refunded: boolean;
  claimed: boolean;
};
export async function fetchEntries(bounty: Address): Promise<OnchainEntry[]> {
  const records = await bountyRpc()
    .getProgramAccounts(BOUNTY_PROGRAM, {
      encoding: "base64",
      commitment: "confirmed",
      filters: [{ dataSize: 92n }],
    })
    .send();
  const entries: OnchainEntry[] = [];
  for (const record of records) {
    const bytes = fromBase64(record.account.data[0]);
    if (
      ![63, 18, 152, 113, 215, 246, 221, 250].every(
        (byte, i) => bytes[i] === byte
      )
    )
      continue;
    const owner = getAddressDecoder().decode(bytes.slice(8, 40));
    if (owner !== bounty) continue;
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    entries.push({
      address: record.pubkey,
      bounty: owner,
      curator: getAddressDecoder().decode(bytes.slice(40, 72)),
      stake: view.getBigUint64(72, true),
      gain: view.getBigUint64(80, true),
      evaluated: bytes[88] === 1,
      refunded: bytes[89] === 1,
      claimed: bytes[90] === 1,
    });
  }
  return entries;
}
