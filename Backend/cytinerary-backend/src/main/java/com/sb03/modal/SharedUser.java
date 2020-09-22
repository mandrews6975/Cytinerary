package com.sb03.modal;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

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
