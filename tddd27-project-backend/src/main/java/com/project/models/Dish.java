package com.project.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
@Table(name = "dishes")
public class Dish {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long dishId;
	private String name;
	private String description;
	private String recipe;
	private Date creationDate;
	private int quantity;
	private Double price;
	private Boolean inUse;
	
	public Dish(String name, String description, String recipe, Date creationDate, int quantity, Double price,
			Boolean inUse) {
		super();
		this.name = name;
		this.description = description;
		this.recipe = recipe;
		this.creationDate = creationDate;
		this.quantity = quantity;
		this.price = price;
		this.inUse = inUse;
	}
}
