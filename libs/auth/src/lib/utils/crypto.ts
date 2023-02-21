import { pbkdf2, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

const defaultHashSize = 64;
const defaultIterations = 10e3;
const digestAlgorithm = 'sha512';
const pbkdf2Async = promisify(pbkdf2);

export async function hashPassword(
  plainPassword: string,
  iterations = defaultIterations,
  hashSize = defaultHashSize
) {
  const salt = randomBytes(hashSize);
  const passwordEncoder = new TextEncoder();
  const passwordEncoded = passwordEncoder.encode(plainPassword);
  const passwordHashed = await pbkdf2Async(
    passwordEncoded,
    salt,
    iterations,
    hashSize,
    digestAlgorithm
  );
  const combinedHash = Buffer.alloc(passwordHashed.length + salt.length + 8);

  combinedHash.writeUInt32BE(salt.length, 0);
  combinedHash.writeUInt32BE(iterations, 4);
  salt.copy(combinedHash, 8);
  passwordHashed.copy(combinedHash, salt.length + 8);

  return combinedHash.toString('base64');
}

export async function verifyPassword(
  encryptedPassword: string,
  plainPassword: string
): Promise<boolean> {
  const buffer = Buffer.from(encryptedPassword, 'base64');
  const saltBytes = buffer.readUInt32BE(0);
  const hashBytes = buffer.length - saltBytes - 8;
  const iterations = buffer.readUInt32BE(4);
  const salt = Uint8Array.prototype.slice.call(buffer, 8, saltBytes + 8);
  const hash = Uint8Array.prototype.slice.call(buffer, saltBytes + 8);

  const verify = await pbkdf2Async(
    plainPassword,
    salt,
    iterations,
    hashBytes,
    digestAlgorithm
  );

  return Buffer.compare(hash, verify) === 0;
}
