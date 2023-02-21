import { hashPassword, verifyPassword } from './crypto';

const passwords = [
  'HmeYy2EcdhZVpz',
  '🅰️🚧🇨🇳🌸🥤💞🍈🚇',
  '☆*:.｡.o(≧▽≦)o.｡.:*☆',
  'ɐñǝsɐɹʇuoɔ',
];
const hashes = [
  'AAAAQAAAJxAx/fZVS9lX9rg8BTkUTcdT4Zc+XikICclUdnCtb6IRClPncqY8y5GE+l8DFIQzJ/BxHsC2NkCbRL42q5PDgdfBC0aSXfaN22rURB58AFWu3p8wvzeIzWDNlMp7q8GaDiclBpw8O7qgAB/PRbtySgcttIr0RGBrSruYMN5Wa0RUYw==',
  'AAAAQAAAJxCS6TBqfSY9X9swt5fcZjMKojjizn4wdYsE5jPaRLpoYLchyrL0uUzl9foGQfps94fcoahwQuEgjzqG4i46hgk87k5oPrLLhbO76kiPD/2Er7t1eoqoG9o9EmMn3zHr4M2r9TiAZHvPoQwfFAiNBPAWqwpEelDqIBGju1t4P6FbTQ==',
  'AAAAQAAAJxDvjTpQdvIkHzfUhIlFwYLIKPVuj7MtPKZniBZRwmhZX3Ryc/1tiWMp9cP35sxMFxu9KHuTLnLYOJ2st/Ja/F11D7ebeUl0GZ0JTVMrpWRqmC2fc/6baD6TuNj6i0srI/O9meXCzMy5c+LLaC+GW4vQ0groWelAtkSx8F5Xu+loVA==',
  'AAAAQAAAJxCC0cx87rxRVnGnnR37eKdgeuMPFNxz1hu7iNNmSuw4oyj6QkZmO98ghJHRG+YSDXK4aPIf4IGL0C3Q2MmAKxfdlPhTMFTV79WwLBu0L0qmZsDHXetus/ZzU+xuOuKKGZHOOGWjUoZT51mLnyPTpt11OGULFEPT/4mD8iqEp3NTgw==',
];
const variableSizeHashes = [
  'AAAADgAANrARy+UbeJKsGy0O3E5IoF5tG42EqS+RxA1tZq/3',
  'AAAAFAAASjgcgZ5bt/mxFqyOh5iiKo7zPs1i4rdfMm2HKwsr2/6Z96TLO/+1ENaI',
  'AAAAFAAASjhg/PFdA2Pf1yHTob5xvnXIvKuF6O/R4gwTIb5bGAw26mq4jp5qxmnj',
  'AAAACgAAJxCxoTkZdEnTxROrdbar9/8RGX6SHQ==',
];

describe('hashPassword', () => {
  it.each(passwords)(
    'Hash the password %s to protected it',
    async (password) => {
      const hash = await hashPassword(password);

      expect(hash).not.toBe(password);
      expect(hash).not.toHaveLength(password.length);
    }
  );

  it.each(
    passwords.map((password) => ({
      password,
      iterations: password.length * 1e3,
      hashSize: Math.ceil(password.length / 2) * 2,
    }))
  )(
    'Hash the password $password with iteration count: $iterations & hash size: $hashSize',
    async ({ password, iterations, hashSize }) => {
      const hash = await hashPassword(password, iterations, hashSize);

      expect(hash).not.toBe(password);
      expect(hash).not.toHaveLength(password.length);
    }
  );
});

describe('verifyPassword', () => {
  it.each(
    passwords.map((password, index) => [
      password,
      hashes[index],
      variableSizeHashes[index],
    ])
  )(
    'Verify that the %s is equal to the hashed password',
    async (password, hash, randomSizeHash) => {
      await expect(verifyPassword(hash, password)).resolves.toBe(true);
      await expect(verifyPassword(randomSizeHash, password)).resolves.toBe(
        true
      );
    }
  );

  it('Verify that the plain password is no equal to another hash', async () => {
    await expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      verifyPassword(hashes.at(-1)!, passwords.at(0)!)
    ).resolves.toBe(false);
  });
});
