package com.sb03.repository;

import org.springframework.stereotype.Repository;
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

  @Modifying
  @Query(value="delete from events where eventId = ?1", nativeQuery = true)
  void deleteEvent(String eventId);

  @Modifying
  @Query(value="insert into events(eventId, creator, name, description, label) values(?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
  void createEvent(String eventId, String creator, String name, String description, String label);
}
