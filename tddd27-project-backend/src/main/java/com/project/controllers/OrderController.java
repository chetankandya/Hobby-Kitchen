package com.project.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.exceptions.InvalidUserException;
import com.project.models.Order;
import com.project.models.OrderedDish;
import com.project.services.OrderServices;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins="http://localhost:3000")
public class OrderController {
	
	@Autowired
	OrderServices orderServices;
	
	@PostMapping("/create")
	public Long createTransaction(@RequestBody Order order) {
		if(order.getDishList() != null)
			{
				for(OrderedDish dish: order.getDishList())
				{
					if(dish.getDishId() != null)
					{
						dish.setDishId(null);
					}
				}
			}
		orderServices.saveOrder(order);
		return order.getOrderId();
	}
	
	@GetMapping("/viewAll")
	public Iterable<Order> viewAllTransactions() {
		return orderServices.getAllOrders();
	}
	
	@GetMapping("/viewByEmail/{email}")
	public Iterable<Order> getOrderByEmail(@PathVariable ("email") String email) {
		return orderServices.getOrderByEmail(email);
	}
	
	@GetMapping("/checkStatus/{isCompleted}")
	public Iterable<Order> getCompletedOrders(@PathVariable ("isCompleted") Boolean isCompleted) {
		return orderServices.getCompletedOrders(isCompleted);
	}
	
	@GetMapping("/view/{orderId}")
	public Order viewTransactionById(@PathVariable ("orderId") Long orderId) {
		Optional<Order> order = orderServices.getOrderByOrderId(orderId);
		if(order.isPresent()) {
			return order.get();
		}
		throw new InvalidUserException("order not found");
	}
	
	@PutMapping("/update/{orderId}")
	public ResponseEntity<Order> updateOrder(@PathVariable ("orderId") Long orderId, @RequestBody Order updatedOrder) {
		
		Order order =  orderServices.getOrderByOrderId(orderId).orElseThrow(() -> new InvalidUserException("Order does not exist"));
		
		if(updatedOrder.getDateOfOrder() != null) {
			order.setDateOfOrder(updatedOrder.getDateOfOrder());
		}
		if(updatedOrder.getDishList() != null) {
			order.setDishList(updatedOrder.getDishList());
		}
		if(updatedOrder.getEmail() != null) {
			order.setEmail(updatedOrder.getEmail());
		}
		if(updatedOrder.getTotalPrice() != null) {
			order.setTotalPrice(updatedOrder.getTotalPrice());
		}
		if(updatedOrder.getIsCompleted() != null) {
			order.setIsCompleted(updatedOrder.getIsCompleted());
		}
		
		orderServices.saveOrder(order);
		return ResponseEntity.ok(order);
	}
}
