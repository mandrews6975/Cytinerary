package com.sb03.repository;

import org.springframework.stereotype.Repository;
import java.util.Collection;
import com.sb03.modal.Participant; 

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Long>{
  @Modifying
  @Query(value="insert into participants(eventId, participant) values (?1, ?2)", nativeQuery = true)
  void addParticipant(String eventId, String participant);

  @Modifying
  @Query(value="delete from participants where eventId = ?1 and participant = ?2 ", nativeQuery = true)
  void removeParticipant(String eventId, String participant);

  @Query(value="select * from participants where eventId = ?1", nativeQuery = true)
  Collection<Participant> getParticipants(String eventId);

  @Query(value="select user.userId, user.netId, user.lastName, user.firstName from users user inner join participants on user.userId = participants.participant where participants.eventId = ?1", nativeQuery = true)
  Collection<Object> getEventParticipants(String eventId);
  
}
