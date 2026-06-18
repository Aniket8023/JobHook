package com.jobportal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobportal.entity.Profile;
public interface ProfileRepository extends MongoRepository<Profile,Long> {
}
