package com.project.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.exceptions.InvalidUserException;
import com.project.models.Dish;
import com.project.services.DishServices;

@RestController
@RequestMapping("/dish")
@CrossOrigin(origins="http://localhost:3000")
public class DishController {
	
	@Autowired
	DishServices dishServices;
	
	@PostMapping("/create")
	public ResponseEntity<Dish> createTransaction(@RequestBody Dish dish) throws IOException {
		dishServices.saveDish(dish);
		return ResponseEntity.ok(dish);
	}
	
	@GetMapping("/viewAll")
	public Iterable<Dish> viewAllTransactions() {
		return dishServices.getAllDishes();
	}
	
	@GetMapping("/checkStatus/{inUse}")
	public Iterable<Dish> getDishesInUse(@PathVariable ("inUse") Boolean inUse) {
		return dishServices.getDishesInUse(inUse);
	}
	
	@GetMapping("/view/{dishId}")
	public Dish viewTransactionById(@PathVariable ("dishId") Long dishId) {
		Optional<Dish> dish = dishServices.getDishByDishId(dishId);
		if(dish.isPresent()) {
			return dish.get();
		}
		throw new InvalidUserException("Dish not found");
	}
	
	@PutMapping("/update/{dishId}")
	public ResponseEntity<Dish> updateOrder(@PathVariable ("dishId") Long dishId, @RequestBody Dish updatedDish) {
		
		Dish dish =  dishServices.getDishByDishId(dishId).orElseThrow(() -> new InvalidUserException("Dish does not exist"));
		
		if(updatedDish.getDescription() != null)
		{
			dish.setDescription(updatedDish.getDescription());
		}
		if(updatedDish.getInUse() != null)
		{
			dish.setInUse(updatedDish.getInUse());
		}
		if(updatedDish.getName() != null)
		{
			dish.setName(updatedDish.getName());
		}
		if(updatedDish.getPrice() != null)
		{
			dish.setPrice(updatedDish.getPrice());
		}
		
		dishServices.saveDish(dish);
		return ResponseEntity.ok(dish);
	}
	
	@DeleteMapping("/delete/{dishId}")
	public ResponseEntity<Map<String, Boolean>> deleteDish(@PathVariable Long dishId){
		Boolean status = dishServices.deleteDishByDishId(dishId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Dish deleted successfully", status);
		return ResponseEntity.ok(response);
	}
}
