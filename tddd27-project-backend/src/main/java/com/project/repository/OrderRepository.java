package com.project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.models.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
	
	public Iterable<Order> findByEmail(String email);
	public Iterable<Order> findByIsCompleted(Boolean isCompleted);
}
