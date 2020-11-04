package com.sb03.repository;

import org.springframework.stereotype.Repository;
import java.util.Collection;
import com.sb03.modal.User;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

  @Query(value="select * from users", nativeQuery = true)
  Collection<User> getUsers();

  @Query(value="select * from users where userId = ?1", nativeQuery = true)
  Collection<User> getUser(String UserId);

  @Query(value="select * from users where netId = ?1", nativeQuery = true)
  Collection<User> userExists(String netId);

  @Query(value="select * from users where netId = ?1 and password = ?2", nativeQuery = true)
  Collection<User> authenticateUser(String netId, String password);

  @Modifying
  @Query(value="insert into users(userId, netId, LastName, FirstName, password) values(uuid(), ?1, ?2, ?3, ?4)", nativeQuery = true)
  void addUser(String netId, String lastName, String firstName, String password);

  @Modifying
  @Query(value="delete from users where userId = ?1", nativeQuery = true)
  void deleteUser(String UserId);

}
