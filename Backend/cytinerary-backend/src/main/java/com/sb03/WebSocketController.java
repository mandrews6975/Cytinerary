package com.sb03;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import com.sb03.modal.Event;
import com.sb03.repository.ParticipantRepository;
import com.sb03.modal.Participant;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;


@Api(value = "EventController", description = "Controller for handling HTTP requests related to events")
@RestController
@CrossOrigin(origins = "*")
public class WebSocketController {

	@Autowired
	private ParticipantRepository participantRepository;

  @Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/eventUpdated")
	public void eventUpdated(@RequestBody Map<String, Object> payload) {
      Collection<Participant> participants = participantRepository.getParticipants((String) payload.get("eventId"));
      for(int i = 0; i < participants.toArray().length; i++){
        simpMessagingTemplate.convertAndSendToUser(participants.toArray(new Participant[participants.size()])[i].getParticipant(), "/eventUpdate", "This is a websockit update message");
      }
	}

}
