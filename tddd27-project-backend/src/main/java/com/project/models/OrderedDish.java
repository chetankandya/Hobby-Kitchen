package com.project.models;

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
@Table(name = "ordered_dishes")
public class OrderedDish {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long dishId;
	private String name;
	private int quantity;
	private Double price;
	
	public OrderedDish(String name, int quantity, Double price) {
		super();
		this.name = name;
		this.quantity = quantity;
		this.price = price;
	}
}