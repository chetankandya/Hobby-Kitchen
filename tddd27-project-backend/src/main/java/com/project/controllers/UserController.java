package com.project.controllers;

import java.util.Optional;

import javax.ws.rs.Produces;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.config.JwtTokenProvider;
import com.project.exceptions.InvalidUserException;
import com.project.models.User;
import com.project.services.UserServices;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
	
	private static Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserServices userServices;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@PostMapping("/create")
	public String createUser(@RequestBody User user) {
		
		if(userServices.checkIfUserExist(user.getEmail())) {
				throw new InvalidUserException("User Already Exist");
		}else {
			user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
			userServices.saveUser(user);
			return user.getUserName();
		}		
		
	}
	
	@GetMapping("/viewAll")
	public Iterable<User> viewAllUsers() {
		return userServices.getAllUsers();
	}
	
	@PutMapping("/update/{email}")
	public ResponseEntity<User> updateUserByEmailId(@PathVariable ("email") String email, @RequestBody User updatedUser) {
		
		User user =  userServices.getUserByEmail(email).orElseThrow(() -> new InvalidUserException("User does not exist"));
		
		if(updatedUser.getUserName() != null) {
			user.setUserName(updatedUser.getUserName());
		}
		if(updatedUser.getRole() != null) {
			user.setRole(updatedUser.getRole());
		}
		if(updatedUser.getEmail() != null) {
			user.setEmail(updatedUser.getEmail());
		}
		if(updatedUser.getPassword() != null) {
			user.setPassword(updatedUser.getPassword());
		}
		if(updatedUser.getAddresses() != null) {
			user.setAddresses(updatedUser.getAddresses());
		}
		
		userServices.saveUser(user);
		return ResponseEntity.ok(user);
	}
	
	@GetMapping("/view/{email}")
	public User viewUserByEmailId(@PathVariable ("email") String email) {
		Optional<User> user = userServices.getUserByEmail(email);
		if(user.isPresent()) {
			return user.get();
		}
		throw new InvalidUserException("User not found");
	}
	
	@Produces(MediaType.APPLICATION_JSON_VALUE)
	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody User user) {
		log.info("UserResourceImpl : authenticate");
		JSONObject jsonObject = new JSONObject();
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
			if (authentication.isAuthenticated()) {
				User userDetails =  userServices.getUserByEmail(user.getEmail()).orElseThrow(() -> new InvalidUserException("User does not exist"));
				jsonObject.put("name", authentication.getName());
				jsonObject.put("role", userDetails.getRole());
				jsonObject.put("token", tokenProvider.createToken(userDetails.getEmail(), userDetails.getRole()));
				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
			}
		} catch (JSONException e) {
			try {
				jsonObject.put("exception", e.getMessage());
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
		}
		return null;
	}
}
