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

import com.sb03.modal.User;
import com.sb03.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  private UserRepository userRepository;

	@GetMapping("/getUsers")
  public @ResponseBody Collection<User> getUsers() {
  return userRepository.getUsers();
  }

  @Transactional
  @PostMapping("/addUser")
  public @ResponseBody String addUser(@RequestBody Map<String, Object> payload) {
    userRepository.addUser((String) payload.get("netId"), (String) payload.get("LastName"), (String) payload.get("FirstName"), (String) payload.get("password"));
    return ((String) payload.get("userId") + "added");
  }

  @Transactional
  @PostMapping("/deleteUser")
  public @ResponseBody String deleteUser(@RequestBody Map<String, Object> payload) {
    userRepository.deleteUser((String) payload.get("userId"));
    return ((String) payload.get("userId") + "deleted");
  }

  @PostMapping("/getUser")
  public @ResponseBody Collection<User> getUser(@RequestBody Map<String, Object> payload) {
    return userRepository.getUser((String) payload.get("UserId"));
  }

  @PostMapping("/userExists")
  public @ResponseBody Collection<User> userExists(@RequestBody Map<String, Object> payload) {
    return userRepository.userExists((String) payload.get("netId"));
  }
}
