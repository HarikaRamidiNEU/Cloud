#!/bin/sh
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      . ~/.nvm/nvm.sh && nvm install 16
      node -e "console.log('Running Node.js ' + process.version)"

      sudo cp /tmp/app.tar.gz .
      tar -xzf app.tar.gz
      npm install
      node src/app.js