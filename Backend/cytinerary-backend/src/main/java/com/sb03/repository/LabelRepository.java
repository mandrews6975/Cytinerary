package com.sb03.repository;

import org.springframework.stereotype.Repository;
import java.util.Collection;
import com.sb03.modal.Label;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {

	@Query(value = "select * from labels where userId = ?1", nativeQuery = true)
	Collection<Label> getLabels(String userId);

	@Query(value = "select * from labels where label = ?1", nativeQuery = true)
	Collection<Label> getLabelColor(String label);

	@Modifying
	@Query(value = "delete from labels where label = ?1", nativeQuery = true)
	void deleteLabel(String label);

	@Modifying
	@Query(value = "insert into labels(userId, label, color) values(?1, ?2, ?3)", nativeQuery = true)
	void addLabel(String userId, String label, String color);
}
