const ALGORITHM_VERSION = "v1";
const SAFE_SYMBOLS = "!@#$%^&*()-_+=";

export async function generatePassword(passphrase, site, length, style) {
  const encoder = new TextEncoder();
  const saltStr = `${site.toLowerCase()}|${ALGORITHM_VERSION}|${style}`;
  const salt = encoder.encode(saltStr);
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  const seed = hashArray.reduce(
    (acc, byte) => acc + byte.toString(16).padStart(2, "0"),
    ""
  );

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = SAFE_SYMBOLS;

  let alphabet = "";
  let required = [];
  const rand = createDeterministicRNG(seed);
  const pick = (set) => set[Math.floor(rand() * set.length)];

  switch (style) {
    case "alphanumeric":
      alphabet = upper + lower + digits;
      required = [pick(upper), pick(lower), pick(digits)];
      break;
    case "ascii-only":
      alphabet = lower + digits;
      required = [pick(lower), pick(digits)];
      break;
    case "strong-symbol":
      alphabet = upper + lower + digits + symbols;
      required = [
        pick(upper),
        pick(lower),
        pick(digits),
        pick(symbols),
        pick(symbols),
      ];
      break;
    case "default":
    default:
      alphabet = upper + lower + digits + symbols;
      required = [pick(upper), pick(lower), pick(digits), pick(symbols)];
      break;
  }

  const pwdArr = required.slice();
  while (pwdArr.length < length) {
    pwdArr.push(alphabet[Math.floor(rand() * alphabet.length)]);
  }
  shuffle(pwdArr, rand);
  return pwdArr.join("");
}

function createDeterministicRNG(seedStr) {
  function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    }
    h = (h << 13) | (h >>> 19);
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  function sfc32(a, b, c, d) {
    return function () {
      a |= 0;
      b |= 0;
      c |= 0;
      d |= 0;
      var t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }

  const seedFunc = xmur3(seedStr);
  return sfc32(seedFunc(), seedFunc(), seedFunc(), seedFunc());
}

function shuffle(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
