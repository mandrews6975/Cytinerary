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

import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "sharedusers")
public class SharedUser {

	@ApiModelProperty(notes = "ID of user sharing his or her schedule with other users", name = "sharer", required = true)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sharer")
	private String sharer;

	@ApiModelProperty(notes = "ID of user having another user's schedule shared with him or her", name = "sharee", required = true)
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
