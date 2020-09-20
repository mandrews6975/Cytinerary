package com.sb03;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.sb03.modal.Event;
import com.sb03.repository.EventRepository;
import com.sb03.service.EventService;


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
  @PostMapping("/deleteEvent")
  public @ResponseBody String delete(@RequestBody Map<String, Object> payload) {
    eventRepository.deleteEvent((String) payload.get("eventId"));
    return ((String) payload.get("eventId") + "deleted");
  }

  @PostMapping("/getEvent")
  public @ResponseBody Collection<Event> getEvent(@RequestBody Map<String, Object> payload) {
    return eventRepository.getEvent((String) payload.get("eventId"));
  }

  @Transactional
  @PostMapping("/createEvent")
  public @ResponseBody String createEvent(@RequestBody Map<String, Object> payload) {
    eventRepository.createEvent((String) payload.get("creator"), (String) payload.get("name"), (String) payload.get("description"), (String) payload.get("label"));
    return("Event " + ((String) payload.get("name")) + " Created");
  }
}
