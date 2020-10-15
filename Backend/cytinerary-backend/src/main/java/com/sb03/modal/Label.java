package com.sb03.modal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "labels")
public class Label {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userid")
	private String userId;

	@Column(name = "label")
	private String label;

	@Column(name = "color")
	private String color;

	public String getUserId() {
		return userId;
	}

	public String getLabel() {
		return label;
	}

	public String getColor() {
		return color;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public void setLabel(String label) {
		this.label = label;
	}

	public void setColor(String color) {
		this.color = color;
	}

}
