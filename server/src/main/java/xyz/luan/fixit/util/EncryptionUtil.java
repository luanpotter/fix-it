package xyz.luan.fixit.util;

import java.math.BigInteger;
import java.security.Key;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;

import lombok.SneakyThrows;
import lombok.experimental.UtilityClass;

@UtilityClass
public class EncryptionUtil {

	public Key parseKey(String key) {
		BigInteger modulus, exponent;
		{
			String[] parts = key.split("#");
			modulus = new BigInteger(parts[0]);
			exponent = new BigInteger(parts[1]);
		}
		try {
			return factory().generatePublic(new RSAPublicKeySpec(modulus, exponent));
		} catch (InvalidKeySpecException e) {
			throw new RuntimeException("Invalid public key", e);
		}
	}

	@SneakyThrows
	public String encrypt(String data, Key key) {
		Cipher cipher = cipher();
		cipher.init(Cipher.ENCRYPT_MODE, key);
		byte[] cipherData = cipher.doFinal(data.getBytes());
		return new String(cipherData);
	}

	private Cipher cipher() {
		try {
			return Cipher.getInstance("RSA");
		} catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
			throw new RuntimeException("RSA no more?", e);
		}
	}

	private KeyFactory factory() {
		try {
			return KeyFactory.getInstance("RSA");
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException("RSA no more?", e);
		}
	}
}
