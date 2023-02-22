#!/bin/sh

      sudo yum update -y

      sudo amazon-linux-extras install postgresql9.6 -y
      sudo yum install postgresql postgresql-server java-1.8.0 glibc.i686 -y
      sudo /usr/bin/postgresql-setup --initdb --unit postgresql
      sudo systemctl start postgresql
      sudo systemctl enable --now postgresql
      sudo systemctl status postgresql
      username="postgres"
      password="XoXo1998"

      sudo passwd ${username} << EOD
      ${password}
      ${password}
EOD

      sudo sed -i 's/peer/md5/g' /var/lib/pgsql/data/pg_hba.conf
      sudo sed -i 's/md5/trust/g' /var/lib/pgsql/data/pg_hba.conf
      sudo sed -i 's/ident/trust/g' /var/lib/pgsql/data/pg_hba.conf
      echo "host    all             all             0.0.0.0/0               trust" | sudo tee -a /var/lib/pgsql/data/pg_hba.conf
      echo "listen_addresses = '*'" | sudo tee -a /var/lib/pgsql/data/postgresql.conf

      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      . ~/.nvm/nvm.sh && nvm install 16
      node -e "console.log('Running Node.js ' + process.version)"

      sudo cp /tmp/app.tar.gz .
      tar -xzf app.tar.gz
      npm install
      node src/app.js
      
      
