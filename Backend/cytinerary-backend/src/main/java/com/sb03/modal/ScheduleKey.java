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
@Table(name = "schedulekeys")
public class ScheduleKey {
	
	@ApiModelProperty(notes = "Schedule key value itself", name = "schedulekey", required = true)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="schedulekey")
	private String scheduleKey;

	@ApiModelProperty(notes = "User associated with the schedule key", name = "userid", required = true)
	@Column(name = "userid")
	private String userId;

	public String getUserId() {
		return userId;
	}

	public String getScheduleKey() {
		return scheduleKey;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setScheduleKey(String scheduleKey) {
		this.scheduleKey = scheduleKey;
	}

}
