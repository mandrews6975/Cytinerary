package com.sb03.service;

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
import com.sb03.modal.ScheduleKey;
import com.sb03.repository.ScheduleKeyRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;


@Api(value = "ScheduleKeyController", description = "Controller for handling HTTP requests related to schedule keys")
@RestController
@CrossOrigin(origins = "*")
public class ScheduleKeyController {

	@Autowired
	private ScheduleKeyRepository scheduleKeyRepository;

  @ApiOperation(value = "Retrieve schedule key associated with specific user")
  @Transactional
  @PostMapping("/getScheduleKey")
  public @ResponseBody Collection<ScheduleKey> getScheduleKey(@RequestBody Map<String, Object> payload) {
	  Collection<ScheduleKey> result = scheduleKeyRepository.getScheduleKey((String) payload.get("userId"));
	  if(result.toArray().length < 1) {
		  scheduleKeyRepository.createScheduleKey((String) payload.get("userId"));
	  }
	  return scheduleKeyRepository.getScheduleKey((String) payload.get("userId"));
  }
  
  @ApiOperation(value = "Retrieve user associated with specific schedule key")
  @PostMapping("/getScheduleKeyUser")
  public @ResponseBody Collection<ScheduleKey> getScheduleKeyUser(@RequestBody Map<String, Object> payload) {
	  return scheduleKeyRepository.getScheduleKeyUser((String) payload.get("scheduleKey"));
  }

  @ApiOperation(value = "Generate new schedule key (overwrite current key) for specific user")
  @Transactional
  @PostMapping("/generateScheduleKey")
  public @ResponseBody String generateScheduleKey(@RequestBody Map<String, Object> payload) {
	  scheduleKeyRepository.generateScheduleKey((String) payload.get("userId"));
	  return "Schedule key generated.";
  }

}
