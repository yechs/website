❯ sudo mv /var/run/docker.sock /var/run/docker.sock.bak
[sudo] password for yechs:
❯ sudo socat -t100 -x -v UNIX-LISTEN:/var/run/docker.sock,mode=777,reuseaddr,fork UNIX-CONNECT:/var/run/docker.sock.bak
