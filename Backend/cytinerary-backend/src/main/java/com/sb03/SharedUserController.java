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

import com.sb03.modal.SharedUser;
import com.sb03.modal.User;
import com.sb03.repository.SharedUserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "SharedUserController", description = "Controller for handling HTTP requests related to users sharing their schedules with other users")
@RestController
@CrossOrigin(origins = "*")
public class SharedUserController {

  @Autowired
  private SharedUserRepository sharedUserRepository;

  @ApiOperation(value = "Get users that a specific user is sharing his or her schedule with")
  @PostMapping("/getSharedUsers")
  public @ResponseBody Collection<Object> getSharedUsers(@RequestBody Map<String, Object> payload) {
	return sharedUserRepository.getSharedUsers((String) payload.get("sharerId"));
  }
  
  @PostMapping("/getSharerUsers")
  public @ResponseBody Collection<Object> getSharerUsers(@RequestBody Map<String, Object> payload) {
	return sharedUserRepository.getSharerUsers((String) payload.get("shareeId"));
  }

  @ApiOperation(value = "Share a specific user's schedule with another user")
  @Transactional
  @PostMapping("/addSharedUser")
  public @ResponseBody String addSharedUser(@RequestBody Map<String, Object> payload) {
    sharedUserRepository.addSharedUser((String) payload.get("sharerId"), (String) payload.get("shareeId"));
    return ((String) payload.get("shareeId") + "added");
  }

  @ApiOperation(value = "Remove a user from the list of users that a specific user is sharing his or her schedule with")
  @Transactional
  @PostMapping("/deleteSharedUser")
  public @ResponseBody String deleteSharedUser(@RequestBody Map<String, Object> payload) {
    sharedUserRepository.deleteSharedUser((String) payload.get("sharerId"), (String) payload.get("shareeId"));
    return ((String) payload.get("shareeId") + "deleted");
  }

}
