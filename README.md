# 🔐 CriptyKey - Deterministic Password Generator (v1)

**CriptyKey** (`ckey`) is a lightweight, secure, and deterministic password generator.  
It uses a single master passphrase and a site name to consistently generate strong, unique passwords — without storing anything anywhere.

## ✨ Features

- 🔁 Deterministic: same inputs always produce the same output
- 🔐 Secure: uses PBKDF2-HMAC-SHA256 internally
- 💡 Supports multiple password styles:
  - `default`: letters, digits, and symbols
  - `alphanumeric`: only letters and digits
  - `ascii-only`: lowercase letters and digits
  - `strong-symbol`: like default but ensures at least two symbols
- ⚙️ Works fully offline
- 💻 Available as a command-line tool and web app
- 🌐 [Web Version Available](https://wilsonfrantine.github.io/criptykey)

---

## 🌐 Web Version

Use CriptyKey directly in your browser:  
👉 [**wilsonfrantine.github.io/criptykey**](https://wilsonfrantine.github.io/criptykey)

- Runs entirely in your browser
- No data is stored or sent anywhere
- Mobile friendly and privacy focused
- Customize password length and style
- Toggle dark/light themes and visibility

---

## 🖥 Terminal Version

### ✅ Installation (Linux / WSL2)

```bash
git clone https://github.com/wilsonfrantine/criptykey.git
cd criptykey
chmod +x ckey
./install.sh
```

After installation, you can use `ckey` globally in your terminal.

### 🪟 Windows

Ensure Python is installed and in your system PATH. Then:

```bash
git clone https://github.com/wilsonfrantine/criptykey.git
cd criptykey
python ckey -n "your passphrase" -s "example.com"
```

Optionally, add to PATH or create a shortcut for easier access.

---

## 🚀 Usage

```bash
ckey -n "your master passphrase" -s "example.com" [--style STYLE] [-t LENGTH]
```

### Options:

- `-n`, `--nova`: master passphrase (required)
- `-s`, `--site`: site or service name (required)
- `-t`, `--tamanho`: password length (default: 20)
- `--style`: password style (default, alphanumeric, ascii-only, strong-symbol)

### Example:

```bash
ckey -n "correct horse battery staple" -s "github.com" --style default -t 24
```

---

## 🧠 Notes

- CriptyKey never saves or transmits any information
- Passwords are strong, reproducible, and unique to each site
- Fully deterministic and offline
- Salt and deterministic seed use the string `<site>|v1|<style>` ensuring each
  site and style combination yields unique passwords

---

## 🔄 Algorithm Version

This is version `v1` of the password generation logic.
The master passphrase is hashed with PBKDF2-HMAC-SHA256 using the salt
`<site>|v1|<style>`. Those 32 bytes seed a deterministic RNG used to build the
password while ensuring required character types. Future versions may extend
functionality, but `v1` behavior will remain stable and compatible.

---

## 📄 License

[MIT License](LICENSE) — Secure your accounts, deterministically.
