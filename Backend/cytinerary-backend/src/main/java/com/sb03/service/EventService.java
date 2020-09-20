package com.sb03.service;

import java.util.List;
import com.sb03.modal.Event;

public interface EventService {
	List<Event> getEvents();
	void delete(String eventId);
	Event get(String eventId);
}
