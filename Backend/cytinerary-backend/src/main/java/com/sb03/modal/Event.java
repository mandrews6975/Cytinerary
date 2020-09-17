package com.sb03.modal;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "events")
public class Event {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "eventid")
	 private String eventId;

	@Column(name = "creator")
	 private String creator;

	@Column(name = "name")
	 private String name;

	@Column(name = "description")
	 private String description;

	@Column(name = "location")
	 private String location;

	@Column(name = "starttime")
	 private Date startTime;

	@Column(name = "endtime")
	 private Date endTime;

	@Column(name = "label")
	 private String label;

	public String getEventId() {
		return eventId;
	}

	public String getCreator() {
		return creator;
	}

	public String getName() {
		return name;
	}
	public String getDescription() {
		return description;
	}
	public String getLocation() {
		return location;
	}
	public Date getStartTime() {
		return startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public String getLabel() {
		return label;
	}

	public void setEventId(String eventId) {
		this.eventId = eventId;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}
