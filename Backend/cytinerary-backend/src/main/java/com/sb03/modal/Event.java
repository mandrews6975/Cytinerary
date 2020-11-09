package com.sb03.modal;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Table(name = "events")
public class Event {

	 @ApiModelProperty(notes = "ID for the given event", name = "eventid", required = true)
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "eventid")
	 private String eventId;

  @ApiModelProperty(notes = "Name of the creator who created an event", name = "creator", required = true)
	@Column(name = "creator")
	 private String creator;

  @ApiModelProperty(notes = "Name of the event, what will be seen on the block of the event", name = "name", required = true)
	@Column(name = "name")
	 private String name;

  @ApiModelProperty(notes = "Description of the event", name = "description", required = true)
	@Column(name = "description")
	 private String description;

  @ApiModelProperty(notes = "Location of a given event", name = "location", required = true)
	@Column(name = "location")
	 private String location;

  @ApiModelProperty(notes = "Starting time of an event", name = "starttime", required = true)
	@Column(name = "starttime")
	 private Timestamp startTime;

  @ApiModelProperty(notes = "Ending time of an event", name = "endtime", required = true)
	@Column(name = "endtime")
	 private Timestamp endTime;

  @ApiModelProperty(notes = "The given label for an event, color coordinated to categorize and style specific events", name = "label", required = true)
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
	public Timestamp getStartTime() {
		return startTime;
	}
	public Timestamp getEndTime() {
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

	public void setStartTime(String startTime) {
		this.startTime = Timestamp.valueOf(startTime);
	}

	public void setEndTime(String endTime) {
		this.endTime = Timestamp.valueOf(endTime);
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Event() {
	}

	public Event(String eventId, String name, Timestamp startTime, Timestamp endTime) {
		this.eventId = eventId;
		this.name = name;
		this.startTime = startTime;
		this.endTime = endTime;
	}
}
