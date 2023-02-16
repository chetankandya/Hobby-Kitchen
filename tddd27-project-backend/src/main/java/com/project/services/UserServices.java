package com.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.project.models.User;
import com.project.repository.UserRepository;

@Service
public class UserServices {
	
	@Autowired
	UserRepository userRepository;
	
	public void saveUser(User user) {
		userRepository.save(user);
	}
	
	public Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findById(email);
	}
	
	public Boolean checkIfUserExist(String email) {
		return userRepository.existsById(email);
	}
}
