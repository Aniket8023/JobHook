package com.jobportal.api;

import com.jobportal.dto.*;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/jobs")
public class JobAPI {
    @Autowired
    private JobService jobService;

    @PostMapping("/post")
    public ResponseEntity<JobDTO>postJob(@RequestBody @Valid JobDTO jobDTO) throws JobPortalException{
        return new ResponseEntity<>(jobService.postJob(jobDTO), HttpStatus.CREATED);
    }
 
    @GetMapping("/getAll")
    public ResponseEntity<List<JobDTO>> getAllJobs() throws JobPortalException {
        return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<JobDTO> getJobs(@PathVariable Long id) throws JobPortalException {
        return new ResponseEntity<>(jobService.getJobs(id), HttpStatus.OK);
    }

    @PostMapping("/apply/{id}")
    public ResponseEntity<ResponseDTO>applyJob(@PathVariable Long id, @RequestBody ApplicantDTO applicantDTO) throws JobPortalException{
        jobService.applyJob(id,applicantDTO);
        return new ResponseEntity<>(new ResponseDTO("Applied Successfully"),HttpStatus.OK);
    }

    @GetMapping("/postedBy/{id}")
    public ResponseEntity<List<JobDTO>> getJobsPostedBy(@PathVariable Long id) throws JobPortalException {
        return new ResponseEntity<>(jobService.getJobsPostedBy(id), HttpStatus.OK);
    }

    @PostMapping("/changeAppStatus")
    public ResponseEntity<ResponseDTO>changeAppStatus(@RequestBody Application application) throws JobPortalException{
        jobService.changeAppStatus(application);
        return new ResponseEntity<>(new ResponseDTO("Application Status Changes Successfully."),HttpStatus.OK);
    }
    
    @GetMapping("/applied/{userId}")
    public ResponseEntity<List<JobDTO>> getAppliedJobs(@PathVariable Long userId) {

        List<JobDTO> jobs = jobService.getAppliedJobs(userId);
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @GetMapping("/suitable/{profileId}")
    public ResponseEntity<List<JobDTO>> getSuitableJobs(
            @PathVariable Long profileId) {

        return new ResponseEntity<>(
                jobService.getSuitableJobs(profileId),
                HttpStatus.OK
        );
    }
}
