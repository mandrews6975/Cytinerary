package com.sb03.modal;

import java.sql.Date;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "users")
public class User {

	@ApiModelProperty(notes = "Unique identifier for a user", name = "userid", required = true)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="userid")
	private String userId;

	@ApiModelProperty(notes = "User's ISU net-ID (used for login)", name = "netid", required = true)
	@Column(name = "netid")
	 private String netId;

	@ApiModelProperty(notes = "User's last name", name = "lastname", required = true)
	@Column(name = "lastname")
	 private String lastName;

	@ApiModelProperty(notes = "User's first name", name = "firstname", required = true)
	@Column(name = "firstname")
	 private String firstName;

	@ApiModelProperty(notes = "User's password (used for login)", name = "password", required = true)
	@Column(name = "password")
	 private String password;

	@ApiModelProperty(notes = "True if user is admin", name = "admin", required = true)
 	@Column(name = "admin")
 	private String admin;

	public String getUserId() {
		return userId;
	}

	public String getNetId() {
		return netId;
	}

	public String getLastName() {
		return lastName;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getPassword() {
		return password;
	}

	public String isAdmin() {
		return admin;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setNetId(String netId) {
		this.netId = netId;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
