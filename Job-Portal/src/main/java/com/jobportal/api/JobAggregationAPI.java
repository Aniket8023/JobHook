package com.jobportal.api;

import com.jobportal.dto.JobDTO;
import com.jobportal.service.JobAggregationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/external-jobs")
@CrossOrigin(origins ="http://localhost:5173")
public class JobAggregationAPI {

    @Autowired
    private JobAggregationService jobAggregationService;

    @GetMapping
    public List<JobDTO> getExternalJobs(@RequestParam String keyword, @RequestParam String location) {
        return jobAggregationService.fetchAllJobs(keyword, location);
    }

    // 🚀 New Resume-based Recommendation Endpoint
    @PostMapping("/resume-recommendation")
    public ResponseEntity<Object> getJobsFromResume(@RequestParam("resume") MultipartFile resumeFile) {
        try {
            // Convert resume file to base64
            byte[] fileBytes = resumeFile.getBytes();
            String base64Resume = Base64.getEncoder().encodeToString(fileBytes);

            // Create request to Flask
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> request = new HashMap<>();
            request.put("resume", base64Resume);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

            String flaskUrl = "http://localhost:5000/recommend-base64";

            ResponseEntity<String> response = restTemplate.postForEntity(flaskUrl, entity, String.class);
            return ResponseEntity.ok(response.getBody());

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Resume processing error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error calling Flask backend: " + e.getMessage());
        }
    }


}
