```console

$ gpg --edit-key hello@shuye.dev
gpg (GnuPG) 2.2.40; Copyright (C) 2022 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  rsa4096/72FF4E8B377057DE
     created: 2019-03-22  expires: 2024-02-13  usage: SCA
     trust: ultimate      validity: ultimate
ssb  rsa4096/6ADD6678BAF0DEEA
     created: 2021-02-10  expired: 2023-02-13  usage: S
ssb  rsa4096/477FEB4FF6E91648
     created: 2019-03-22  expired: 2023-02-13  usage: E
ssb  rsa4096/7E7591884BB942EE
     created: 2021-02-10  expired: 2023-02-10  usage: S
[ultimate] (1). Ye Shu <hello@shuye.dev>
[ultimate] (2)  Ye Shu (for signing git commits) <chshu@protonmail.ch>

gpg> key 1

sec  rsa4096/72FF4E8B377057DE
     created: 2019-03-22  expires: 2024-02-13  usage: SCA
     trust: ultimate      validity: ultimate
ssb* rsa4096/6ADD6678BAF0DEEA
     created: 2021-02-10  expired: 2023-02-13  usage: S
ssb  rsa4096/477FEB4FF6E91648
     created: 2019-03-22  expired: 2023-02-13  usage: E
ssb  rsa4096/7E7591884BB942EE
     created: 2021-02-10  expired: 2023-02-10  usage: S
[ultimate] (1). Ye Shu <hello@shuye.dev>
[ultimate] (2)  Ye Shu (for signing git commits) <chshu@protonmail.ch>

gpg> key 2

sec  rsa4096/72FF4E8B377057DE
     created: 2019-03-22  expires: 2024-02-13  usage: SCA
     trust: ultimate      validity: ultimate
ssb* rsa4096/6ADD6678BAF0DEEA
     created: 2021-02-10  expired: 2023-02-13  usage: S
ssb* rsa4096/477FEB4FF6E91648
     created: 2019-03-22  expired: 2023-02-13  usage: E
ssb  rsa4096/7E7591884BB942EE
     created: 2021-02-10  expired: 2023-02-10  usage: S
[ultimate] (1). Ye Shu <hello@shuye.dev>
[ultimate] (2)  Ye Shu (for signing git commits) <chshu@protonmail.ch>

gpg> expire
Are you sure you want to change the expiration time for multiple subkeys? (y/N) y
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 1y3m
invalid value
Key is valid for? (0) 15m
Key expires at Sun 19 May 2024 01:56:50 PM EDT
Is this correct? (y/N) y

sec  rsa4096/72FF4E8B377057DE
     created: 2019-03-22  expires: 2024-02-13  usage: SCA
     trust: ultimate      validity: ultimate
ssb* rsa4096/6ADD6678BAF0DEEA
     created: 2021-02-10  expires: 2024-05-19  usage: S
ssb* rsa4096/477FEB4FF6E91648
     created: 2019-03-22  expires: 2024-05-19  usage: E
ssb  rsa4096/7E7591884BB942EE
     created: 2021-02-10  expired: 2023-02-10  usage: S
[ultimate] (1). Ye Shu <hello@shuye.dev>
[ultimate] (2)  Ye Shu (for signing git commits) <chshu@protonmail.ch>

gpg> expire
Are you sure you want to change the expiration time for multiple subkeys? (y/N) N

gpg> key

sec  rsa4096/72FF4E8B377057DE
     created: 2019-03-22  expires: 2024-02-13  usage: SCA
     trust: ultimate      validity: ultimate
ssb  rsa4096/6ADD6678BAF0DEEA
     created: 2021-02-10  expires: 2024-05-19  usage: S
ssb  rsa4096/477FEB4FF6E91648
     created: 2019-03-22  expires: 2024-05-19  usage: E
ssb  rsa4096/7E7591884BB942EE
     created: 2021-02-10  expired: 2023-02-10  usage: S
[ultimate] (1). Ye Shu <hello@shuye.dev>
[ultimate] (2)  Ye Shu (for signing git commits) <chshu@protonmail.ch>

gpg> expire
Changing expiration time for the primary key.
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 27m
Key expires at Wed 14 May 2025 01:57:47 PM EDT
Is this correct? (y/N) y

sec  rsa4096/72FF4E8B377057DE
     created: 2019-03-22  expires: 2025-05-14  usage: SCA
     trust: ultimate      validity: ultimate
ssb  rsa4096/6ADD6678BAF0DEEA
     created: 2021-02-10  expires: 2024-05-19  usage: S
ssb  rsa4096/477FEB4FF6E91648
     created: 2019-03-22  expires: 2024-05-19  usage: E
ssb  rsa4096/7E7591884BB942EE
     created: 2021-02-10  expired: 2023-02-10  usage: S
[ultimate] (1). Ye Shu <hello@shuye.dev>
[ultimate] (2)  Ye Shu (for signing git commits) <chshu@protonmail.ch>

gpg> save

$ gpg -K --keyid-format LONG --with-subkey-fingerprint
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
gpg: next trustdb check due at 2025-05-14
/home/yechs/.gnupg/pubring.kbx
------------------------------
sec   rsa4096/72FF4E8B377057DE 2019-03-22 [SCA] [expires: 2025-05-14]
      F021058172993F4D228EDB6972FF4E8B377057DE
uid                 [ultimate] Ye Shu <hello@shuye.dev>
uid                 [ultimate] Ye Shu (for signing git commits) <chshu@protonmail.ch>
ssb   rsa4096/6ADD6678BAF0DEEA 2021-02-10 [S] [expires: 2024-05-19]
      DA8805B33B013B67BBAAFD936ADD6678BAF0DEEA
ssb   rsa4096/477FEB4FF6E91648 2019-03-22 [E] [expires: 2024-05-19]
      690A2335F5CCBC44D2C32D51477FEB4FF6E91648


$ gpg --keyserver keyserver.ubuntu.com --send-keys hello@shuye.dev
gpg: "hello@shuye.dev" not a key ID: skipping

$ gpg -K --keyid-format LONG --with-subkey-fingerprint
/home/yechs/.gnupg/pubring.kbx
------------------------------
sec   rsa4096/72FF4E8B377057DE 2019-03-22 [SCA] [expires: 2025-05-14]
      F021058172993F4D228EDB6972FF4E8B377057DE
uid                 [ultimate] Ye Shu <hello@shuye.dev>
uid                 [ultimate] Ye Shu (for signing git commits) <chshu@protonmail.ch>
ssb   rsa4096/6ADD6678BAF0DEEA 2021-02-10 [S] [expires: 2024-05-19]
      DA8805B33B013B67BBAAFD936ADD6678BAF0DEEA
ssb   rsa4096/477FEB4FF6E91648 2019-03-22 [E] [expires: 2024-05-19]
      690A2335F5CCBC44D2C32D51477FEB4FF6E91648


$ gpg -K --keyid-format LONG --with-subkey-fingerprint

$ gpg --keyserver keyserver.ubuntu.com --send-keys F021058172993F4D228EDB6972FF4E8B377057DE
gpg: sending key 72FF4E8B377057DE to hkp://keyserver.ubuntu.com

$ gpg --keyserver keys.openpgp.org --send-keys F021058172993F4D228EDB6972FF4E8B377057DE
gpg: sending key 72FF4E8B377057DE to hkp://keys.openpgp.org

```
