#!/bin/sh

      sudo yum update -y
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      . ~/.nvm/nvm.sh
      nvm install 16
      node -e "console.log('Running Node.js ' + process.version)"

      sudo amazon-linux-extras install postgresql9.6 -y
      sudo yum install postgresql postgresql-server java-1.8.0 glibc.i686 -y
      sudo /usr/bin/postgresql-setup --initdb --unit postgresql
      sudo systemctl start postgresql
      sudo systemctl enable --now postgresql
      sudo systemctl status postgresql
      sudo passwd postgres
      postgres
      postgres

      sudo sed -i 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf
      sudo sed -i 's/peer/md5/g' /var/lib/pgsql/data/pg_hba.conf
      sudo echo "host    all             all             0.0.0.0/0               md5" >> /var/lib/pgsql/data/pg_hba.conf
      sudo echo "listen_addresses = '*'" >> /var/lib/pgsql/data/postgresql.conf
      
      sudo cp /tmp/app.tar.gz /home/ec2-user/
      sudo tar -xvzf /home/ec2-user/app.tar.gz
      sudo node /home/ec2-user/webapp/src/app.js
      
      
