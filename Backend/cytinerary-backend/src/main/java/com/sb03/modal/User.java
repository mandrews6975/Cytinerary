package com.sb03.modal;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "userid")
	 private String userId;

	@Column(name = "netid")
	 private String netId;

	@Column(name = "lastname")
	 private String lastName;

	@Column(name = "firstname")
	 private String firstName;

	@Column(name = "password")
	 private String password;

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
