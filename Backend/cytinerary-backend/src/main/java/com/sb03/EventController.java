package com.sb03;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.sb03.modal.Event;
import com.sb03.repository.EventRepository;

@RestController
@CrossOrigin(origins = "*")
public class EventController {

	@Autowired
	private EventRepository eventRepository;

  @Transactional
  @PostMapping("/getEvents")
  public @ResponseBody Collection<Event> getEvents(@RequestBody Map<String, Object> payload) {
    return eventRepository.getEvents((String) payload.get("creator"));
  }

  @Transactional
  @PostMapping("/getCreatorEvents")
  public @ResponseBody Collection<Event> getCreatorEvents(@RequestBody Map<String, Object> payload) {
	    return eventRepository.getCreatorEvents((String) payload.get("creator"), (String) payload.get("startDate"), (String) payload.get("endDate"));
  }
  
  @Transactional
  @PostMapping("/getParticipantEvents")
  public @ResponseBody Collection<Event> getParticipantEvents(@RequestBody Map<String, Object> payload) {
	    return eventRepository.getParticipantEvents((String) payload.get("participant"), (String) payload.get("startDate"), (String) payload.get("endDate"));
  }

	@Transactional
	@PostMapping("/deleteEvent")
	public @ResponseBody String delete(@RequestBody Map<String, Object> payload) {
		eventRepository.deleteEvent((String) payload.get("creator"), (String) payload.get("eventId"));
		return ((String) payload.get("eventId") + "deleted");
	}
	
	@Transactional
	@PostMapping("/updateCreatorEventTime")
	public @ResponseBody String updateCreatorEventTime(@RequestBody Map<String, Object> payload) {
		eventRepository.updateCreatorEventTime((String) payload.get("userId"),(String) payload.get("eventId"),(String) payload.get("startTime"),(String) payload.get("endTime"));
    	return "Event updated";
    }

  @PostMapping("/getEvent")
  public @ResponseBody Collection<Event> getEvent(@RequestBody Map<String, Object> payload) {
    return eventRepository.getEvent((String) payload.get("creatorId"), (String) payload.get("eventId"));
  }

	@Transactional
	@PostMapping("/createEvent")
	public @ResponseBody String createEvent(@RequestBody Map<String, Object> payload) {
		eventRepository.createEvent(
				(String) payload.get("eventId"),
				(String) payload.get("creator"),
				(String) payload.get("name"),
				(String) payload.get("description"),
				Timestamp.valueOf((String) payload.get("startTime")),
				Timestamp.valueOf((String) payload.get("endTime")),
				(String) payload.get("label"));
		return ("Event " + ((String) payload.get("name")) + " created");
	}
	
	@Transactional
	@PostMapping("updateEvent")
	public @ResponseBody String updateEvent(@RequestBody Map<String, Object> payload) {
		eventRepository.updateEvent(
				(String) payload.get("eventId"),
				(String) payload.get("creator"),
				(String) payload.get("name"),
				(String) payload.get("description"),
				Timestamp.valueOf((String) payload.get("startTime")),
				Timestamp.valueOf((String) payload.get("endTime")),
				(String) payload.get("location"),
				(String) payload.get("label"));
		return ("Event " + ((String) payload.get("name")) + " updated");
	}
}
