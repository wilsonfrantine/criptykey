#!/bin/bash

# CriptyKey Installer
# Installs the ckey script to ~/bin and ensures it's in the PATH

set -e

echo "🔧 Installing CriptyKey..."

TARGET_DIR="$HOME/bin"
SCRIPT_NAME="ckey"
DEST="$TARGET_DIR/$SCRIPT_NAME"

# Create ~/bin if it doesn't exist
mkdir -p "$TARGET_DIR"

# Copy the script from the same directory as this installer
cp "$(dirname "$0")/$SCRIPT_NAME" "$DEST"
chmod +x "$DEST"

# Ensure ~/bin is in PATH
if ! echo "$PATH" | grep -q "$HOME/bin"; then
    echo "➕ Adding ~/bin to PATH in ~/.bashrc"
    echo 'export PATH="$HOME/bin:$PATH"' >> "$HOME/.bashrc"
    source "$HOME/.bashrc"
fi

echo "✅ CriptyKey installed successfully!"
echo "👉 You can now run: ckey -n \"your passphrase\" -s \"example.com\""

