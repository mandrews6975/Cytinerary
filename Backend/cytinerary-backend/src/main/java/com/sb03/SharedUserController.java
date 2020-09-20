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
import com.sb03.repositories.SharedUserRepository;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  private SharedUserRepository sharedUserRepository;

	@GetMapping("/getSharedUsers")
  public @ResponseBody Collection<User> getSharedUsers(@RequestBody Map<String, Object> payload) {
  return sharedUserRepository.getSharedUsers((String) payload.get("sharerId"));
  }

  @Transactional
  @PostMapping("/addSharedUser")
  public @ResponseBody String addSharedUser(@RequestBody Map<String, Object> payload) {
    sharedUserRepository.addSharedUser((String) payload.get("sharerId"), (String) payload.get("shareeId"));
    return ((String) payload.get("shareeId") + "added");
  }

  @Transactional
  @PostMapping("/deleteSharedUser")
  public @ResponseBody String deleteSharedUser(@RequestBody Map<String, Object> payload) {
    sharedUserRepository.deleteUser((String) payload.get("sharerId"), (String) payload.get("shareeId"));
    return ((String) payload.get("shareeId") + "deleted");
  }

}
