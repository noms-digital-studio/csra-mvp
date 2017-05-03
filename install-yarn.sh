#!/usr/bin/env bash
echo "Installing yarn..."
curl -L "https://yarnpkg.com/install.sh" -o yarn-installer.sh
# Ensure the yarn installer uses the yarn.cmd executable to run yarn
sed -i'.bak' -e 's/yarn -/yarn.cmd -/' yarn-installer.sh
YARN_GPG=no bash -x yarn-installer.sh -- --version 0.21.3
