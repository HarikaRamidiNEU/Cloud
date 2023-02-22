#!/bin/sh

      sudo yum update -y
      sudo yum -y upgrade
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      . ~/.nvm/nvm.sh
      nvm install node
      
      sudo amazon-linux-extras enable postgresql14
      sudo yum install postgresql-server -y
      tar -xf /home/ec2user/app.tar.gz
      sudo mv /tmp/appservice.service /etc/systemd/system/appservice.service

      sudo postgresql-setup initdb
      sudo systemctl start postgresql
      sudo systemctl enable postgresql
      sudo -u postgres psql
      ALTER USER postgres PASSWORD 'password';

      sudo systemctl daemon-reload
      sudo systemctl enable appservice.service
      sudo systemctl start appservice.service
      sudo systemctl status appservice.service
