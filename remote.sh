rsync -rave "ssh -i .ssh/key.pem" --exclude=key.pem --exclude=node_modules --exclude=.idea ./* ubuntu@ec2-35-158-4-88.eu-central-1.compute.amazonaws.com:/var/www/node