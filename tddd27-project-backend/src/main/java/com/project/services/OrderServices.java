package com.project.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.models.Order;
import com.project.repository.OrderRepository;

@Service
public class OrderServices {

	@Autowired
	OrderRepository orderRepository;
	
	public void saveOrder(Order order) {
		orderRepository.save(order);
	}
	
	public Iterable<Order> getAllOrders() {
		return orderRepository.findAll();
	}
	
	public Optional<Order> getOrderByOrderId(Long orderId) {
		return orderRepository.findById(orderId);
	}
	
	public Iterable<Order> getOrderByEmail(String email) {
		return orderRepository.findByEmail(email);
	}
	
	public Iterable<Order> getCompletedOrders(Boolean isCompleted) {
		return orderRepository.findByIsCompleted(isCompleted);
	}
}
