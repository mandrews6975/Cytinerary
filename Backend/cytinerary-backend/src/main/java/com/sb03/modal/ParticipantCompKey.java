package com.sb03.modal;

import java.io.Serializable;

public class ParticipantCompKey implements Serializable {
	private String eventId;
	private String participant;

	public ParticipantCompKey() {}

	public ParticipantCompKey(String eventId, String participants) {
		this.eventId = eventId;
		this.participant = participant;
	}
}
