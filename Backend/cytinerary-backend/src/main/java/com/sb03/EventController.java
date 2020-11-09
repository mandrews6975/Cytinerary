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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;


@Api(value = "EventController", description = "Controller for handling HTTP requests related to events")
@RestController
@CrossOrigin(origins = "*")
public class EventController {

	@Autowired
	private EventRepository eventRepository;

  @ApiOperation(value = "Retrieve events associated to specific creator")
  @Transactional
  @PostMapping("/getEvents")
  public @ResponseBody Collection<Event> getEvents(@RequestBody Map<String, Object> payload) {
    return eventRepository.getEvents((String) payload.get("creator"));
  }

  @ApiOperation(value = "Retrieve creator events associated to specific creator and start/end date")
  @Transactional
  @PostMapping("/getCreatorEvents")
  public @ResponseBody Collection<Event> getCreatorEvents(@RequestBody Map<String, Object> payload) {
	    return eventRepository.getCreatorEvents((String) payload.get("creator"), (String) payload.get("startDate"), (String) payload.get("endDate"));
  }

	@ApiOperation(value = "Retrieve participant events associated to specific participant and start/end date")
  @Transactional
  @PostMapping("/getParticipantEvents")
  public @ResponseBody Collection<Event> getParticipantEvents(@RequestBody Map<String, Object> payload) {
	    return eventRepository.getParticipantEvents((String) payload.get("participant"), (String) payload.get("startDate"), (String) payload.get("endDate"));
  }

  @ApiOperation(value = "Delete a specific event from the event table")
	@Transactional
	@PostMapping("/deleteEvent")
	public @ResponseBody String delete(@RequestBody Map<String, Object> payload) {
		eventRepository.deleteEvent((String) payload.get("creator"), (String) payload.get("eventId"));
		return ((String) payload.get("eventId") + "deleted");
	}

	@ApiOperation(value = "Update the start/end time of the given creators event")
	@Transactional
	@PostMapping("/updateCreatorEventTime")
	public @ResponseBody String updateCreatorEventTime(@RequestBody Map<String, Object> payload) {
		eventRepository.updateCreatorEventTime((String) payload.get("userId"),(String) payload.get("eventId"),(String) payload.get("startTime"),(String) payload.get("endTime"));
    	return "Event updated";
    }

  @ApiOperation(value = "Retrieve specific event associated to specific creator and event id")
  @PostMapping("/getEvent")
  public @ResponseBody Collection<Event> getEvent(@RequestBody Map<String, Object> payload) {
    return eventRepository.getEvent((String) payload.get("creatorId"), (String) payload.get("eventId"));
  }

	@ApiOperation(value = "Retrieve specific event associated to specific event id")
  @PostMapping("/getEventWithId")
  public @ResponseBody Collection<Event> getEventWithId(@RequestBody Map<String, Object> payload) {
    return eventRepository.getEventWithId((String) payload.get("eventId"));
  }

  @ApiOperation(value = "Create a new event")
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

	@ApiOperation(value = "Update an existing event")
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

	@ApiOperation(value = "Delete a participant from an existing event")
	@Transactional
	@PostMapping("/deleteParticipantFromEvent")
	public @ResponseBody String deleteParticipantFromEvent(@RequestBody Map<String, Object> payload){
		eventRepository.deleteParticipantFromEvent((String) payload.get("eventId"), (String) payload.get("participant"));
		return ("Participant " + (String) payload.get("participant") + " removed from the event " + (String) payload.get("name"));
	}
}
