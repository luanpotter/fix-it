package xyz.luan.fixit.models;

import java.security.Key;
import java.util.List;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;
import io.yawp.repository.annotations.Json;
import io.yawp.repository.annotations.Text;
import lombok.Data;
import xyz.luan.fixit.util.EncryptionUtil;

@Data
@Endpoint(path = "/fix")
public class Fix {

	@Id
	private IdRef<Fix> id;

	@Index
	private String name;

	@Index
	private String version;

	private String owner;

	private String hashedIdentity;

	@Index
	private String domain;

	private boolean subdomains;

	private String page;

	@Json
	private List<String> domains;

	@Text
	private String code;

	public String getIdentity() {
		return name + "#" + version;
	}

	public boolean valid() {
		return name.matches("[^#]*") && version.matches("[0-9\\.]*") && owner.matches("[0-9]*#[0-9]*");
	}

	public Key parseOwnerPublicKey() {
		return EncryptionUtil.parseKey(owner);
	}

	public boolean verifyOwnership() {
		String expectedHashedIdentity = EncryptionUtil.encrypt(getIdentity(), parseOwnerPublicKey());
		return expectedHashedIdentity.equals(hashedIdentity);
	}
}
