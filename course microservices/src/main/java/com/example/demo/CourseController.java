package com.example.demo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course newCourse = courseService.saveCourse(course);
        return ResponseEntity.ok(newCourse);
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }
    @PostMapping("/approve/{id}")
    public ResponseEntity<Course> approveCourse(@PathVariable Long id) {
        Course course = courseService.approveCourse(id);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam(required = false) String name,
                                                      @RequestParam(required = false) String category,
                                                      @RequestParam(required = false) String description,
                                                      @RequestParam(required = false) String duration,
                                                      @RequestParam(required = false) Double rating,
                                                      @RequestParam(required = false) String status,
                                                      @RequestParam(required = false) Integer capacity) {
        List<Course> courses = courseService.searchCourses(name, category, description, duration, rating, status, capacity);
        return ResponseEntity.ok(courses);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(id, course);
        return ResponseEntity.ok(updatedCourse);
    }
    @PatchMapping("/increment-enrollment/{courseId}")
    public ResponseEntity<Course> incrementEnrollment(@PathVariable Long courseId) {
        try {
            Course updatedCourse = courseService.incrementEnrolledStudents(courseId);
            return ResponseEntity.ok(updatedCourse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



}

