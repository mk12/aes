AES Decryption
==============

AES Descryption is an AESthetically pleasing web app which decrypts AES ciphertext. More specifically, it likes aes-256-cbc and Base64. The actual decryption is done on the client side using [CryptoJS][].

This was more of an exercise in web design than anything else, which is why it might appear to be slightly useless.

[CryptoJS]: https://code.google.com/p/crypto-js/

Usage
-----

Your best bet is OpenSSL: 

    $ openssl aes-256-cbc -base64 -in secrets -out secrets.aes

Use a strong [passphrase][pass] and then copy the contents of the file to your clipboard. Fire up [AES Decryption][aes], paste in the ciphertext, enter the passhrase, and click the decrypt button.

[pass]: http://passphra.se
[aes]: http://mitchellkember.com/aes/

License
-------

Copyright © 2012 Mitchell Kember

AES Decryption is available under the MIT license; see [LICENSE][] for details.

[LICENSE]: https://github.com/mk12/aes/blob/gh-pages/LICENSE.md
