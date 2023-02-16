package com.project.exceptions;

public class InvalidUserException extends RuntimeException {
private static final long serialVersionUID = 1L;
	
	public InvalidUserException(String errorMessage) {
		super(errorMessage);
	}
}

