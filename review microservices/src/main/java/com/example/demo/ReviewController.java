package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        Review savedReview = reviewService.saveReview(review);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Review>> getReviewsByCourse(@PathVariable Long courseId) {
        List<Review> reviews = reviewService.getReviewsByCourse(courseId);
        return ResponseEntity.ok(reviews);
    }
    // Get average rating for a course
    @GetMapping("/average-rating/{courseId}")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long courseId) {
        Double averageRating = reviewService.calculateAverageRating(courseId);
        return ResponseEntity.ok(averageRating);
    }
}
