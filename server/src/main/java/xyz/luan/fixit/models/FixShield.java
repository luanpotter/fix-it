package xyz.luan.fixit.models;

import java.util.List;

import io.yawp.repository.IdRef;
import io.yawp.repository.shields.Shield;

public class FixShield extends Shield<Fix> {

	@Override
	public void index(IdRef<?> parentId) {
		allow(true);
	}

	@Override
	public void show(IdRef<Fix> id) {
		allow(true);
	}

	@Override
	public void custom() {
		allow(true);
	}

	@Override
	public void create(List<Fix> fixes) {
		for (Fix fix : fixes) {
			create(fix);
		}
	}

	public void create(Fix fix) {
		allow(fix.valid() && matchesOwner(fix) && fix.verifyOwnership());
	}

	private boolean matchesOwner(Fix fix) {
		Fix sameName = yawp(Fix.class).where("name", "=", fix.getName()).first();
		return sameName == null || sameName.getOwner().equals(fix.getOwner());
	}

	@Override
	public void update(IdRef<Fix> id, Fix object) {
		allow(false);
	}

	@Override
	public void destroy(IdRef<Fix> id) {
		allow(false);
	}

}
