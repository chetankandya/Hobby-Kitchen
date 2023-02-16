package com.project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.project.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

}
