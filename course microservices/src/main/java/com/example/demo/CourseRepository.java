package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {


    List<Course> findByNameContainingIgnoreCase(String name);
    List<Course> findByCategory(String category);
    List<Course> findByDescriptionContainingIgnoreCase(String description);
    List<Course> findByDuration(String duration);
    List<Course> findByRating(Double rating);
    List<Course> findByStatus(String status);
    List<Course> findByCapacity(Integer capacity);
}


