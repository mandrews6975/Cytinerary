package com.sb03.modal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.io.Serializable;

import io.swagger.annotations.ApiModelProperty;

@Entity
@IdClass(LabelCompKey.class)
@Table(name = "labels")
public class Label implements Serializable{

	@ApiModelProperty(notes = "Unique identifier for a user", name = "userid", required = true)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userid")
	private String userId;

  @ApiModelProperty(notes = "Label used to categorize specific events, associated only to the user who created it", name = "label", required = true)
	@Id
	@Column(name = "label")
	private String label;

  @ApiModelProperty(notes = "Color used to style the specific labels", name = "color", required = true)
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
