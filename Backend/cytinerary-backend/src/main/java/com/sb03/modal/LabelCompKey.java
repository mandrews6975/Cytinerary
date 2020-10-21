package com.sb03.modal;

import java.io.Serializable;

public class LabelCompKey implements Serializable {
	private String userId;
	private String label;
	
	public LabelCompKey() {}
	
	public LabelCompKey(String userId, String label) {
		this.userId = userId;
		this.label = label;
	}
}
