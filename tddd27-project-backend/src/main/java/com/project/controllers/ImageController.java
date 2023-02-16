package com.project.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.exceptions.InvalidUserException;
import com.project.models.Image;
import com.project.services.ImageServices;
import com.project.utils.ImageUtility;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins="http://localhost:3000")
public class ImageController {

	@Autowired
	ImageServices imageServices;

	@PostMapping("/upload")
	public ResponseEntity<String> uplaodImage(@RequestParam("image") MultipartFile file,  @RequestParam("dishId") Long dishId)
			throws IOException {

		imageServices.saveImage(Image.builder()
				.dishId(dishId)
				.name(file.getOriginalFilename())
				.type(file.getContentType())
				.image(ImageUtility.compressImage(file.getBytes())).build());
		return ResponseEntity.status(HttpStatus.OK)
				.body(file.getOriginalFilename());
	}

	@GetMapping(path = {"/view/{dishId}"})
	public ResponseEntity<byte[]> getImageByDishId(@PathVariable("dishId") Long dishId) throws IOException {

		final Optional<Image> dbImage = imageServices.getImageByDishId(dishId);

		return ResponseEntity
				.ok()
				.contentType(MediaType.valueOf(dbImage.get().getType()))
				.body(ImageUtility.decompressImage(dbImage.get().getImage()));
	}

	@DeleteMapping("/delete/{dishId}")
	public ResponseEntity<Map<String, Boolean>> deleteDish(@PathVariable Long dishId){

		Image image = imageServices.getImageByDishId(dishId).orElseThrow(() -> new InvalidUserException("Image does not exist"));
		Boolean status = imageServices.deleteImageById(image.getId());  
		Map<String, Boolean> response = new HashMap<>();
		response.put("Image deleted successfully", status);
		return ResponseEntity.ok(response);
	}
}