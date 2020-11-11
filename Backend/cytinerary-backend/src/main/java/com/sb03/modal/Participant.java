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
@IdClass(ParticipantCompKey.class)
@Table(name = "participants")
public class Participant implements Serializable {

	@ApiModelProperty(notes = "ID of event being shared", name = "eventid", required = true)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eventid")
	private String eventId;

	@ApiModelProperty(notes = "ID of user that is a participant of the event", name = "participant", required = true)
	@Id
	@Column(name = "participant")
	 private String participant;

	public String getEventId() {
		return eventId;
	}

	public String getParticipant() {
		return participant;
	}

	public void setParticipant(String participant) {
		this.participant = participant;
	}

}
