package xyz.luan.fixit.models;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;
import io.yawp.repository.annotations.Json;
import java.util.List;

@Endpoint(path = "/fix")
public class Fix {

	@Id
	private IdRef<Fix> id;

	@Index
	private String name;

	@Index
	private String version;

	@Index
	private String domain;

	private boolean subdomains;

	private String page;

	@Json
	private List<String> domains;
}
