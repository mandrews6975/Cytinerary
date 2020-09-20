package com.sb03.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sb03.modal.Event;
import com.sb03.dao.EventDAO;

@Service
public class EventServiceImp implements EventService {
  @Autowired
  private EventDAO eventDao;

  @Transactional
   //@Override
   public List<Event> getEvents() {
     return eventDao.getEvents();
   }

  @Transactional
   //@Override
 	 public void delete(String eventId) {
     eventDao.delete(eventId);
   }

  @Transactional
   //@Override
   public Event get(String eventId) {
     return eventDao.get(eventId);
   }

}
