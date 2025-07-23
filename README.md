# CriptyKey - Deterministic Password Generator (v1)

**CriptyKey** (`ckey`) is a lightweight, deterministic, and secure password generator. It uses a master passphrase and a site name to create strong passwords — consistently reproducible and never stored.

## Features

- Deterministic: same inputs always produce the same output
- Supports multiple password styles:
  - `default`: strong password with letters, digits, and symbols
  - `alphanumeric`: only letters and digits
  - `ascii-only`: lowercase letters and digits only
  - `strong-symbol`: like default but forces at least 2 symbols
- Designed for command-line use
- Compatible with WSL2, Linux, and Windows (via Python)

## Installation

### On Linux or WSL2

```bash
git clone https://github.com/your-user/CriptyKey.git
cd CriptyKey
chmod +x ckey
./install.sh
```

After installation, you can use `ckey` from anywhere in your terminal.

### On Windows

Ensure Python is installed and available in PATH. Then:

```powershell
git clone https://github.com/your-user/CriptyKey.git
cd CriptyKey
python ckey -n "your master passphrase" -s "example.com"
```

Or make a shortcut to run it from anywhere using environment variables.

## Usage

```bash
ckey -n "your master passphrase" -s "example.com" [--style STYLE] [-t LENGTH]
```

- `-n`, `--nova`: master phrase (required)
- `-s`, `--site`: site or service name (required)
- `-t`, `--tamanho`: password length (default: 20)
- `--style`: password style (`default`, `alphanumeric`, `ascii-only`, `strong-symbol`)

## Example

```bash
ckey -n "correct horse battery staple" -s "github.com" --style default -t 24
```

## Notes

- This script never saves or transmits data
- Internally uses PBKDF2-HMAC-SHA256 with a fixed version salt (`v1`)
- Passwords are cryptographically strong and site-specific

## Algorithm Version

This is version **v1** of the password generation logic. Future versions may introduce new formats but will not break existing behavior for `v1`.

---

MIT Licensed. Secure your accounts, deterministically.

