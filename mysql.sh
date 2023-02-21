#!/bin/sh

      sudo apt -y update
      sudo apt -y upgrade
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      . ~/.nvm/nvm.sh
      nvm install node
      
      sudo amazon-linux-extras install postgresql15
      tar -xf /home/ec2user/app.tar.gz
      sudo mv /tmp/appservice.service /etc/systemd/system/appservice.service

      sudo systemctl daemon-reload
      sudo systemctl enable appservice.service
      sudo systemctl start appservice.service
      sudo systemctl status appservice.service
