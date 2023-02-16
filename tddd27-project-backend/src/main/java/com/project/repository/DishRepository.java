package com.project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.project.models.Dish;

@Repository
public interface DishRepository extends CrudRepository<Dish, Long> {
	
	public Iterable<Dish> findByInUse(Boolean inUse);
}
