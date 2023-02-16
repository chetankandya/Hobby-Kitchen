package com.project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.project.models.Address;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long>{

}
