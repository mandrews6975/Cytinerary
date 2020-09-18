package com.sb03.dao;

import java.util.List;
import com.sb03.modal.Event;

public interface EventDAO {
	//List<Event> getEvents(User user);
	List<Event> getEvents();

	void delete(String eventId);

	Event get(String eventId);
}
