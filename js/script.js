function submit() {
	var cipherField = document.getElementById("ciphertext");
	var passField = document.getElementById("passphrase");
	var txtArea = document.getElementById("plaintext");
	txtArea.value = "";

	var ciphertext = cipherField.value;
	var passphrase = passField.value;

	cipherField.className = ciphertext ? "" : "error";
	passField.className = passphrase ? "" : "error";
	if (!ciphertext || !passphrase)
		return;

	txtArea.className = "";
	txtArea.value = ". . .";

	var decrypted = CryptoJS.AES.decrypt(ciphertext, passphrase);
	try {
		var str = decrypted.toString(CryptoJS.enc.Utf8);
		if (!str) throw new Error();
		txtArea.value = str;
	} catch (e) {
		txtArea.className = "error";
		txtArea.value = "Error: Wrong Password";
	}
};

window.onload = function() {
	document.getElementById("form").onsubmit = function() {
		submit();
		return false;
	};
};

