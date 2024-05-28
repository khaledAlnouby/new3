package com.example.demo;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course approveCourse(Long courseId) {
            Course course = courseRepository.findById(courseId).orElseThrow();
            course.setStatus("Approved");
            return courseRepository.save(course);
        }

    public List<Course> searchCourses(String name, String category, String description,
                                      String duration, Double rating, String status, Integer capacity) {
        if (StringUtils.hasText(name)) {
            return courseRepository.findByNameContainingIgnoreCase(name);
        } else if (StringUtils.hasText(category)) {
            return courseRepository.findByCategory(category);
        } else if (StringUtils.hasText(description)) {
            return courseRepository.findByDescriptionContainingIgnoreCase(description);
        } else if (StringUtils.hasText(duration)) {
            return courseRepository.findByDuration(duration);
        } else if (rating != null) {
            return courseRepository.findByRating(rating);
        } else if (StringUtils.hasText(status)) {
            return courseRepository.findByStatus(status);
        } else if (capacity != null) {
            return courseRepository.findByCapacity(capacity);
        } else {
            return courseRepository.findAll();
        }
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public Course updateCourse(Long courseId, Course updatedCourseDetails) {
        Course existingCourse = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        existingCourse.setName(updatedCourseDetails.getName());
        existingCourse.setCategory(updatedCourseDetails.getCategory());
        existingCourse.setDescription(updatedCourseDetails.getDescription());
        existingCourse.setDuration(updatedCourseDetails.getDuration());
        existingCourse.setRating(updatedCourseDetails.getRating());
        existingCourse.setCapacity(updatedCourseDetails.getCapacity());
        return courseRepository.save(existingCourse);
    }

    public Course incrementEnrolledStudents(Long courseId) {
        Course course = courseRepository.findById(courseId).
                orElseThrow(() -> new RuntimeException("Course not found"));
        course.setEnrolledStudentsCount(course.getEnrolledStudentsCount() + 1);
        return courseRepository.save(course);
    }


}

