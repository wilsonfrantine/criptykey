export async function generatePassword(passphrase, site, length, style) {
  const encoder = new TextEncoder();
  const salt = encoder.encode("CriptyKey-v1");
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
  ) + site;

  let chars = "";
  switch (style) {
    case "alphanumeric":
      chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      break;
    case "ascii-only":
      chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      break;
    case "strong-symbol":
    case "default":
    default:
      chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=";
      break;
  }

  const rand = createDeterministicRNG(seed);
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars[Math.floor(rand() * chars.length)];
  }

  return pwd;
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
