package com.sb03.repositories;

import org.springframework.stereotype.Repository;
import java.util.Collection;
import com.sb03.modal.SharedUser;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.sb03.modal.User;

@Repository
public interface SharedUserRepository extends CrudRepository<SharedUser, Long>{

  @Query(value="select userId, netId, LastName, FirstName from users inner join sharedusers on users.userId = sharedusers.shareeId where sharer = ?1 ", nativeQuery = true)
  Collection<SharedUser> getSharedUsers(String sharerId);

  @Modifying
  @Query(value="insert into sharedusers(sharer, sharee) values(?1, ?2)", nativeQuery = true)
  void addSharedUser(String sharerId, String shareeId);

  @Modifying
  @Query(value="delete from sharedusers where sharerId = ?1 and shareeId = ?2", nativeQuery = true)
  void deleteSharedUser(String sharerId, String shareeId);

}
