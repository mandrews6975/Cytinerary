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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;

@Api(value = "ParticipantController", description = "Controller for handling HTTP requests related to event participants")
@RestController
@CrossOrigin(origins = "*")
public class ParticipantController {

  @Autowired
  private ParticipantRepository participantRepository;

  @ApiOperation(value = "Add participant to event")
  @Transactional
  @PostMapping("/addParticipant")
  public @ResponseBody String addParticipant(@RequestBody Map<String, Object> payload) {
    participantRepository.addParticipant((String) payload.get("eventId"), (String) payload.get("participant"));
    return ((String) payload.get("participant") + "added to" + (String) payload.get("eventId"));
  }

  @ApiOperation(value = "Remove participant from event")
  @Transactional
  @PostMapping("/removeParticipant")
  public @ResponseBody String removeParticipant(@RequestBody Map<String, Object> payload) {
    participantRepository.removeParticipant((String) payload.get("eventId"), (String) payload.get("participant"));
    return ((String) payload.get("participant") + "deleted from" + (String) payload.get("eventId"));
  }

  @ApiOperation(value = "Get participants of a specific event")
  @PostMapping("/getParticipants")
  public @ResponseBody Collection<Participant> getParticipants(@RequestBody Map<String, Object> payload) {
    return participantRepository.getParticipants((String) payload.get("eventId"));
  }
  
  @ApiOperation(value = "Get participants of a specific event")
  @PostMapping("/getEventParticipants")
  public @ResponseBody Collection<Object> getParticipantsSecure(@RequestBody Map<String, Object> payload) {
    return participantRepository.getEventParticipants((String) payload.get("eventId"));
  }
}
