package com.sb03.repository;

import org.springframework.stereotype.Repository;
import java.util.Collection;

import com.sb03.modal.ScheduleKey;
import com.sb03.modal.User;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface ScheduleKeyRepository extends CrudRepository<ScheduleKey, Long>{

  @Query(value="select * from schedulekeys where userId = ?1", nativeQuery = true)
  Collection<ScheduleKey> getScheduleKey(String userId);
  
  @Query(value="select * from schedulekeys where scheduleKey = ?1", nativeQuery = true)
  Collection<ScheduleKey> getScheduleKeyUser(String scheduleKey);

  @Modifying
  @Query(value="update schedulekeys set scheduleKey = uuid() where userId = ?1", nativeQuery = true)
  void generateScheduleKey(String userId);
  
  @Modifying
  @Query(value="insert into schedulekeys (scheduleKey, userId) values (uuid(), ?1)", nativeQuery = true)
  void createScheduleKey(String userId);
  
}
