package com.project.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.project.models.Image;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long>  {
	
	Optional<Image> findByName(String name);
	Optional<Image> findByDishId(Long dishId);
}
