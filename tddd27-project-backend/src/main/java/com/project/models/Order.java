package com.project.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
@Table(name = "orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long orderId;
	private String email;
	private Boolean isCompleted;
	private Date dateOfOrder;
	private Double totalPrice;
	@OneToMany(targetEntity = OrderedDish.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "OrderedDishes", referencedColumnName = "orderId")
	private List<OrderedDish> dishList;
	
	public Order(String email, Boolean isCompleted, Date dateOfOrder, Double totalPrice, List<OrderedDish> dishList) {
		super();
		this.email = email;
		this.isCompleted = isCompleted;
		this.dateOfOrder = dateOfOrder;
		this.totalPrice = totalPrice;
		this.dishList = dishList;
	}
}
