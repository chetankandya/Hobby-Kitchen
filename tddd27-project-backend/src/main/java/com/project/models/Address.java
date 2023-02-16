package com.project.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class Address {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long addressId;
	private String address;
	private String phoneNumber;
	
	public Address(String address, String phoneNumber) {
		super();
		this.address = address;
		this.phoneNumber = phoneNumber;
	}
}
