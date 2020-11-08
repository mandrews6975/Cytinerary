package com.sb03.repository;

import org.springframework.stereotype.Repository;
import java.util.Collection;
import com.sb03.modal.SharedUser;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.sb03.modal.User;

@Repository
public interface SharedUserRepository extends CrudRepository<SharedUser, Long>{

  @Query(value="select user.userId, user.netId, user.lastName, user.firstName from users user inner join sharedusers on user.userId = sharedusers.sharee where sharedusers.sharer = ?1", nativeQuery = true)
  Collection<Object> getSharedUsers(String sharerId);
  
  @Query(value="select user.userId, user.netId, user.lastName, user.firstName from users user inner join sharedusers on user.userId = sharedusers.sharer where sharedusers.sharee = ?1", nativeQuery = true)
  Collection<Object> getSharerUsers(String shareeId);

  @Modifying
  @Query(value="insert into sharedusers(sharer, sharee) values(?1, ?2)", nativeQuery = true)
  void addSharedUser(String sharerId, String shareeId);

  @Modifying
  @Query(value="delete from sharedusers where sharer = ?1 and sharee = ?2", nativeQuery = true)
  void deleteSharedUser(String sharerId, String shareeId);

}
