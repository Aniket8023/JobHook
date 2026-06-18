package com.jobportal.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobportal.api.MultipartInputStreamFileResource;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.JobStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class JobAggregationService {

    @Value("${jsearch.api.url}")
    private String JSEARCH_API_URL;

    @Value("${jsearch.api.key}")
    private String JSEARCH_API_KEY;

    @Value("${jooble.api.url}")
    private String JOOBLE_API_URL;

    @Value("${adzuna.api.url.template}")
    private String ADZUNA_API_URL_TEMPLATE;

    @Value("${adzuna.app.id}")
    private String ADZUNA_APP_ID;

    @Value("${adzuna.app.key}")
    private String ADZUNA_APP_KEY;

    public List<JobDTO> fetchAllJobs(String keyword, String location) {
        List<JobDTO> allJobs = new ArrayList<>();

        allJobs.addAll(fetchJobsFromJSearch(keyword, location));
        allJobs.addAll(fetchJobsFromJooble(keyword, location));
        allJobs.addAll(fetchJobsFromAdzuna(keyword, location));

        // ✅ Remove duplicates based on title + company
        Set<String> seen = new HashSet<>();
        List<JobDTO> uniqueJobs = new ArrayList<>();
        for (JobDTO job : allJobs) {
            String key = job.getJobTitle() + job.getCompany();
            if (seen.add(key)) {
                uniqueJobs.add(job);
            }
        }

        return uniqueJobs;
    }

    // ✅ 1. JSearch API
    private List<JobDTO> fetchJobsFromJSearch(String keyword, String location) {
        List<JobDTO> jobs = new ArrayList<>();
        try {
            RestTemplate restTemplate = new RestTemplate();

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(JSEARCH_API_URL)
                    .queryParam("query", keyword + " in " + location)
                    .queryParam("page", 1)
                    .queryParam("num_pages", 3)
                    .queryParam("country", "in");

            HttpHeaders headers = new HttpHeaders();
            headers.set("X-RapidAPI-Key", JSEARCH_API_KEY);
            headers.set("X-RapidAPI-Host", "jsearch.p.rapidapi.com");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    builder.toUriString(), HttpMethod.GET, entity, String.class
            );

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode data = root.path("data");

            for (JsonNode jobNode : data) {
                jobs.add(mapToJobDTO(
                        jobNode.path("job_title").asText("Unknown Title"),
                        jobNode.path("employer_name").asText("Unknown Company"),
                        jobNode.path("job_city").asText("") + ", " + jobNode.path("job_country").asText(""),
                        trimDescription(jobNode.path("job_description").asText("")),
                        jobNode.path("job_employment_type").asText("Not Specified")
                ));
            }

        } catch (Exception e) {
            System.err.println("JSearch API error: " + e.getMessage());
        }

        return jobs;
    }

    // ✅ 2. Jooble REST API
    private List<JobDTO> fetchJobsFromJooble(String keyword, String location) {
        List<JobDTO> jobs = new ArrayList<>();
        try {
            RestTemplate restTemplate = new RestTemplate();

            String requestJson = String.format("{\"keywords\":\"%s\",\"location\":\"%s\"}", keyword, location);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    JOOBLE_API_URL, HttpMethod.POST, entity, String.class
            );

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode jobsArr = root.path("jobs");

            for (JsonNode jobNode : jobsArr) {
                jobs.add(mapToJobDTO(
                        jobNode.path("title").asText("Unknown Title"),
                        jobNode.path("company").asText("Unknown Company"),
                        jobNode.path("location").asText("Unknown Location"),
                        trimDescription(jobNode.path("snippet").asText("")),
                        "Not specified"
                ));
            }

        } catch (Exception e) {
            System.err.println("Jooble API error: " + e.getMessage());
        }

        return jobs;
    }

    // ✅ 3. Adzuna API
    private List<JobDTO> fetchJobsFromAdzuna(String keyword, String location) {
        List<JobDTO> jobs = new ArrayList<>();
        try {
            RestTemplate restTemplate = new RestTemplate();

            String adzunaUrl = String.format(ADZUNA_API_URL_TEMPLATE, "in");
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(adzunaUrl)
                    .queryParam("app_id", ADZUNA_APP_ID)
                    .queryParam("app_key", ADZUNA_APP_KEY)
                    .queryParam("what", keyword)
                    .queryParam("where", location)
                    .queryParam("results_per_page", 30);

            ResponseEntity<String> response = restTemplate.getForEntity(builder.toUriString(), String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode results = root.path("results");

            for (JsonNode jobNode : results) {
                jobs.add(mapToJobDTO(
                        jobNode.path("title").asText("Unknown Title"),
                        jobNode.path("company").path("display_name").asText("Unknown Company"),
                        jobNode.path("location").path("display_name").asText("Unknown Location"),
                        trimDescription(jobNode.path("description").asText("")),
                        jobNode.path("contract_type").asText("Not Specified")
                ));
            }

        } catch (Exception e) {
            System.err.println("Adzuna API error: " + e.getMessage());
        }

        return jobs;
    }

    // ✅ Utility: Safe DTO Mapper
    private JobDTO mapToJobDTO(String title, String company, String location, String desc, String jobType) {
        JobDTO job = new JobDTO();
        job.setId(null);
        job.setJobTitle(title);
        job.setCompany(company);
        job.setApplicants(Collections.emptyList());
        job.setAbout("This is a job fetched from external API");
        job.setExperience("Not specified");
        job.setJobType(jobType);
        job.setLocation(location);
        job.setPackageOffered(0L);
        job.setPostTime(LocalDateTime.now());
        job.setDescription(desc);
        job.setSkillsRequired(List.of("Skill not specified"));
        job.setJobStatus(JobStatus.ACTIVE);
        job.setPostedBy(-1L);
        return job;
    }

    // ✅ Utility: Trim large descriptions
    private String trimDescription(String desc) {
        return desc.length() > 500 ? desc.substring(0, 500) + "..." : desc;
    }

    // ✅ NEW: Resume-based recommendation using Flask API
    public Map<String, Object> getJobRecommendationsFromResume(MultipartFile resumeFile) {
        try {
            String flaskApiUrl = "http://localhost:5000/recommend";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultipartInputStreamFileResource fileResource =
                    new MultipartInputStreamFileResource(resumeFile.getInputStream(), resumeFile.getOriginalFilename());

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("resume", fileResource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<String> response = restTemplate.postForEntity(flaskApiUrl, requestEntity, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(response.getBody());

            return mapper.convertValue(jsonNode, Map.class);

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.singletonMap("error", "Failed to fetch job recommendations from resume.");
        }
    }
}
