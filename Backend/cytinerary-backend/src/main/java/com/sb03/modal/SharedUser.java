package com.sb03.modal;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sharedusers")
public class SharedUser {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "sharer")
	 private String sharer;

	@Column(name = "sharee")
	 private String sharee;

	public String getSharer() {
		return sharer;
	}

	public String getSharee() {
		return sharee;
	}

	public void setSharer(String sharer) {
		this.sharer = sharer;
	}

	public void setSharee(String sharee) {
		this.sharee = sharee;
	}

}
