package xyz.luan.fixit.models;

import java.security.Key;
import java.util.List;

import io.yawp.commons.http.HttpException;
import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;
import io.yawp.repository.annotations.Json;
import io.yawp.repository.annotations.Text;
import lombok.Data;
import net.sf.oval.ConstraintViolation;
import net.sf.oval.Validator;
import net.sf.oval.constraint.MatchPattern;
import net.sf.oval.constraint.NotNull;
import xyz.luan.fixit.util.EncryptionUtil;

@Data
@Endpoint(path = "/fix")
public class Fix {

    @Id
    private IdRef<Fix> id;

    @Index
    @NotNull
    @MatchPattern(pattern = { "[^#]*" })
    private String name;

    @Index
    @MatchPattern(pattern = { "[0-9][\\.0-9]*" })
    private String version;

    @MatchPattern(pattern = { "[^#]*" })
    private String owner;

    private String hashedIdentity;

    @Index
    @NotNull
    private String domain;

    @NotNull
    private Boolean subdomains;

    private String page;

    @Json
    private List<String> domains;

    @Text
    @NotNull
    private String code;

    public String getIdentity() {
        return name + "#" + version;
    }

    public void validate() {
        List<ConstraintViolation> errors = new Validator().validate(this);
        if (!errors.isEmpty()) {
            throw new HttpException(422, errors.toString());
        }
    }

    public Key parseOwnerPublicKey() {
        return EncryptionUtil.parseKey(owner);
    }

    public boolean verifyOwnership() {
        String expectedHashedIdentity = EncryptionUtil.encrypt(getIdentity(), parseOwnerPublicKey());
        return expectedHashedIdentity.equals(hashedIdentity);
    }
}
