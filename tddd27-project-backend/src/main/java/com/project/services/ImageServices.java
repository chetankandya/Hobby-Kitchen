package com.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.project.models.Image;
import com.project.repository.ImageRepository;

@Service
public class ImageServices {

	@Autowired
	ImageRepository imageRepository;

	public void saveImage(Image image) {
		imageRepository.save(image);
	}

	public Optional<Image> getImageByDishId(Long dishId) {
		return imageRepository.findByDishId(dishId);
	}

	public Optional<Image> getImageByName(String name) {
		return imageRepository.findByName(name);
	}

	public Boolean deleteImageById(Long id) {
		Boolean success = Boolean.valueOf(true);
		try
		{
			imageRepository.deleteById(id);
		}
		catch(Exception e)
		{
			success = Boolean.valueOf(false);
		}
		return success;
	}
}
