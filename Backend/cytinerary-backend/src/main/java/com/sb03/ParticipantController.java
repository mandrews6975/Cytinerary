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

import com.sb03.modal.Participant;
import com.sb03.repository.ParticipantRepository;


@RestController
@CrossOrigin(origins = "*")
public class ParticipantController {

  @Autowired
  private ParticipantRepository participantRepository;

  @Transactional
  @PostMapping("/addParticipant")
  public @ResponseBody String addParticipant(@RequestBody Map<String, Object> payload) {
    participantRepository.addParticipant((String) payload.get("eventId"), (String) payload.get("participant"));
    return ((String) payload.get("participant") + "added to" + (String) payload.get("eventId"));
  }

  @Transactional
  @PostMapping("/removeParticipant")
  public @ResponseBody String removeParticipant(@RequestBody Map<String, Object> payload) {
    participantRepository.removeParticipant((String) payload.get("eventId"), (String) payload.get("participant"));
    return ((String) payload.get("participant") + "deleted from" + (String) payload.get("eventId"));
  }

  @PostMapping("/getParticipants")
  public @ResponseBody Collection<Participant> getParticipants(@RequestBody Map<String, Object> payload) {
    return participantRepository.getParticipants((String) payload.get("eventId"));
  }
  
  @PostMapping("/getParticipantsSecure")
  public @ResponseBody Collection<Object> getParticipantsSecure(@RequestBody Map<String, Object> payload) {
    return participantRepository.getParticipantsSecure((String) payload.get("eventId"));
  }
}
