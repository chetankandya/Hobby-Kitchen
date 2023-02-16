package com.project.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.models.Dish;
import com.project.repository.DishRepository;

@Service
public class DishServices {
	
	@Autowired
	DishRepository dishRepository;
	
	public void saveDish(Dish dish) {
		dishRepository.save(dish);
	}
	
	public Iterable<Dish> getAllDishes() {
		return dishRepository.findAll();
	}
	
	public Optional<Dish> getDishByDishId(Long dishId) {
		return dishRepository.findById(dishId);
	}
	
	public Boolean deleteDishByDishId(Long dishId) {
		Boolean success = true;
		try {
			dishRepository.deleteById(dishId);
		}
		catch(Exception e){
			success = false;
		}
		return success;
	}
	
	public Iterable<Dish> getDishesInUse(Boolean inUse) {
		return dishRepository.findByInUse(inUse);
	}
}

