import { generateKeyPairSync } from 'node:crypto';
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { getAddressDecoder } from '@solana/kit';
mkdirSync('anchor/target/deploy', { recursive: true });
for (const name of ['kynetic_bounty', 'testnet-deployer']) {
 const path = `anchor/target/deploy/${name}-keypair.json`;
 if (!existsSync(path)) {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  const seed = privateKey.export({format:'der',type:'pkcs8'}).subarray(-32);
  const pub = publicKey.export({format:'der',type:'spki'}).subarray(-32);
  writeFileSync(path, JSON.stringify([...seed, ...pub]), { mode: 0o600 });
 }
 const {readFileSync} = await import('node:fs');
 const secret = JSON.parse(readFileSync(path,'utf8'));
 console.log(`${name}: ${getAddressDecoder().decode(Uint8Array.from(secret.slice(32)))}`);
}
