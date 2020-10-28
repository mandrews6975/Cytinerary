package com.sb03.repository;

import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Collection;
import com.sb03.modal.Event; // replace w/ event entity

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface EventRepository extends CrudRepository<Event, Long>{

  @Query(value="select * from events where creator = ?1", nativeQuery = true)
  Collection<Event> getEvents(String creator);

  @Query(value="select * from events where creator = ?1 and eventId = ?2", nativeQuery = true)
  Collection<Event> getEvent(String creator, String eventId);
  
  @Query(value="select * from events where eventId = ?1", nativeQuery = true)
  Collection<Event> getEventWithId(String eventId);

  @Query(value="select *\r\n" + 
        "from events\r\n" + 
  		"where creator in\r\n" + 
  		"(select userId from users where userId = ?1) and startTime >= ?2 and endTime < ?3", nativeQuery = true)
  Collection<Event> getCreatorEvents(String creator, String startTime, String endTime);
  
  @Modifying
  @Query(value="Update events\r\n" + 
  		"set startTime = ?3, endTime = ?4\r\n" + 
  		"where eventId = ?2 and creator = ?1", nativeQuery = true)
  void updateCreatorEventTime(String userId, String eventId, String startTime, String endTime);
  
  
  @Query(value="select *\r\n" + 
  		"from events\r\n" + 
  		"	inner join participants\r\n" + 
  		"    on participants.eventId = events.eventId\r\n" + 
  		"    where participants.participant = ?1 and events.startTime >= ?2 and events.endTime < ?3", nativeQuery = true)
	  Collection<Event> getParticipantEvents(String participant, String startTime, String endTime);
  
  @Modifying
  @Query(value="delete from events where creator=?1 and eventId = ?2", nativeQuery = true)
  void deleteEvent(String creator, String eventId);

  @Modifying
  @Query(value="insert into events(eventId, creator, name, description, starttime, endtime, label) values(?1, ?2, ?3, ?4, ?5, ?6, ?7)", nativeQuery = true)
  void createEvent(String eventId, String creator, String name, String description, Timestamp startTime, Timestamp endTime, String label);
  
  @Modifying
  @Query(value="update events set name = ?3, description = ?4, startTime = ?5, endTime = ?6, location = ?7, label = ?8 where eventId = ?1 and creator = ?2", nativeQuery = true)
  void updateEvent(String eventId, String creator, String name, String description, Timestamp startTime, Timestamp endTime, String location, String label);
  
  @Modifying
  @Query(value="delete from participants where eventId=?1 and participant=?2", nativeQuery = true)
  void deleteParticipantFromEvent(String eventId, String participant);
}
