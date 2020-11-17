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

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.google.common.hash.Hashing;
import com.sb03.modal.User;
import com.sb03.repository.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "UserController", description = "Controller for handling HTTP requests related to core user data")
@RestController
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @ApiOperation(value = "Get all users in the database")
  @GetMapping("/getUsers")
  public @ResponseBody Collection<User> getUsers() {
  return userRepository.getUsers();
  }

  @ApiOperation(value = "Add (create new) user to the database")
  @Transactional
  @PostMapping("/addUser")
  public @ResponseBody String addUser(@RequestBody Map<String, Object> payload) {
	final String hashPassword = Hashing.sha256().hashString((String) payload.get("password"), StandardCharsets.UTF_8).toString();
    userRepository.addUser((String) payload.get("netId"), (String) payload.get("LastName"), (String) payload.get("FirstName"), hashPassword);
    return ((String) payload.get("userId") + "added");
  }

  @ApiOperation(value = "Get user token necessary for sending user-specific requests (token should be stored in local storage of browser)")
  @PostMapping("/authenticateUser")
  public @ResponseBody String[] authenticateUser(@RequestBody Map<String, Object> payload) throws NoSuchAlgorithmException {
    //MessageDigest digest = MessageDigest.getInstance("SHA-256");
    //byte[] hash = digest.digest(((String) payload.get("password")).getBytes(StandardCharsets.UTF_8));
    //
    final String hash = Hashing.sha256().hashString((String) payload.get("password"), StandardCharsets.UTF_8).toString();
    //String hash = org.apache.commons.codec.digest.DigestUtils.sha256Hex((String) payload.get("password"));
    Collection<User> result = userRepository.authenticateUser((String) payload.get("netId"), hash);
    if (result.isEmpty()) {
      return null;
    }
    String userId = ((User) result.toArray()[0]).getUserId();
    String isAdmin = ((User) result.toArray()[0]).isAdmin();
    String[] res = new String[2];
    res[0] = userId;
    res[1] = isAdmin;
    return res;
  }

  @ApiOperation(value = "Remove user from the database")
  @Transactional
  @PostMapping("/deleteUser")
  public @ResponseBody String deleteUser(@RequestBody Map<String, Object> payload) {
    userRepository.deleteUser((String) payload.get("userId"));
    return ((String) payload.get("userId") + "deleted");
  }

  @ApiOperation(value = "Get core user information about a specfic user")
  @PostMapping("/getUser")
  public @ResponseBody Collection<User> getUser(@RequestBody Map<String, Object> payload) {
    return userRepository.getUser((String) payload.get("UserId"));
  }

  @ApiOperation(value = "Get core user information about a specfic user (used for checking if user exists in database)")
  @PostMapping("/userExists")
  public @ResponseBody Collection<User> userExists(@RequestBody Map<String, Object> payload) {
    return userRepository.userExists((String) payload.get("netId"));
  }
}
