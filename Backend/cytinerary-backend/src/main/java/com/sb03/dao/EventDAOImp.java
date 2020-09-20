package com.sb03.dao;

import java.util.List;

import javax.persistence.EntityManager;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sb03.modal.Event;

@Repository
public class EventDAOImp implements EventDAO {

  @Autowired
  private EntityManager entityManager;

  //@Override
  public List<Event> getEvents() {
    Session currSession = entityManager.unwrap(Session.class);
    Query<Event> query = currSession.createQuery("from Event", Event.class);
    List<Event> list = query.getResultList();
    return list;
  }

  //@Override
  public Event get(String eventId) {
    Session currSession = entityManager.unwrap(Session.class);
    Event event = currSession.get(Event.class, eventId);
    return event;
  }

  //@Override
	public void delete(String eventId) {
    Session currSession = entityManager.unwrap(Session.class);
    Event event = currSession.get(Event.class, eventId);
    currSession.delete(eventId);
  }
}
