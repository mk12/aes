AES Decryption
==============

AES Decryption is a (surprise!) tool that decrypts files encrypted with the Advanced Encryption Standard. More specifically, it likes files that use aes-256-cbc and that are encoded in Base64. It is also very AESthetically pleasing.

The actual decryption is done on the client side using [CryptoJS][].

[CryptoJS]: https://code.google.com/p/crypto-js/

Usage
-----

Your best bet to create a file that will work with AES Descryption is OpenSSL:

    $ openssl aes-256-cbc -base64 -in secrets -out secrets.aes

Use a strong [passphrase][pass] and then store this file somewhere on the web (e.g. Dropbox). Fire up [AES Decryption][aes], enter in the URL and passhrase, and click the decrypt button.

[pass]: http://passphra.se
[aes]: http://mitchellkember.com/aes/

License
-------

Copyright © 2012 Mitchell Kember

AES Decryption is available under the MIT license, see [LICENSE][] for details.

[LICENSE]: https://github.com/mk12/aes/blob/gh-pages/LICENSE.md
