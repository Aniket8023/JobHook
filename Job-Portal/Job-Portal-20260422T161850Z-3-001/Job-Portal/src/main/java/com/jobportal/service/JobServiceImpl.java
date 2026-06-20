package com.jobportal.service;

import com.jobportal.dto.*;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jobportal.entity.Profile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service("jobService")
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException{
        if(jobDTO.getId() == null || jobDTO.getId() == 0) {
            jobDTO.setId(Utilities.getNextSequence("jobs"));
            jobDTO.setPostTime(LocalDateTime.now());
            NotificationDTO notiDto=new NotificationDTO();
            notiDto.setAction("Job Posted");
            notiDto.setMessage("Job Posted Successfully for "+jobDTO.getJobTitle()+" at "+jobDTO.getCompany());
            notiDto.setUserId(jobDTO.getPostedBy());
            notiDto.setRoute("/posted-jobs/"+jobDTO.getId());
            notificationService.sendNotification(notiDto);
        }
        else{
            Job job=jobRepository.findById(jobDTO.getId()).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND"));
            if(job.getJobStatus().equals(JobStatus.DRAFT)||jobDTO.getJobStatus().equals(JobStatus.CLOSED))jobDTO.setPostTime(LocalDateTime.now());
        }
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public JobDTO getJobs(Long id) throws JobPortalException{
        return jobRepository.findById(id).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND")).toDTO();
    }

    @Override
    public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
        Job job=jobRepository.findById(id).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant>applicants=job.getApplicants();
        if(applicants==null)applicants=new ArrayList<>();
        if(applicants.stream().filter((x)->x.getApplicantId()==applicantDTO.getApplicantId()).toList().size()>0)throw new JobPortalException("JOB_APPLIED_ALREADY");
        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long id) {
        return jobRepository.findByPostedBy(id).stream().map((x)->x.toDTO()).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
        Job job=jobRepository.findById(application.getId()).orElseThrow(()->new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant>applicants=job.getApplicants().stream().map((x)->{
            if(application.getApplicantId()==x.getApplicantId()){
                x.setApplicationStatus(application.getApplicationStatus());
                if(application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
                    x.setInterviewTime(application.getInterviewTime());
                    NotificationDTO notiDto = new NotificationDTO();
                    notiDto.setAction("Interview Scheduled");
                    notiDto.setMessage("Interview scheduled for job id: " + application.getId());
                    notiDto.setUserId(application.getApplicantId());
                    notiDto.setRoute("/job-history");
                    try {
                        notificationService.sendNotification(notiDto);
                    } catch (JobPortalException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
            return x;
        }).toList();
        job.setApplicants(applicants);
        jobRepository.save(job);
    }
    
    @Override
    public List<JobDTO> getAppliedJobs(Long applicantId) {

        List<Job> allJobs = jobRepository.findAll();

        List<JobDTO> result = new ArrayList<>();

        for (Job job : allJobs) {
            if (job.getApplicants() != null) {
                boolean matched = job.getApplicants().stream()
                        .anyMatch(app -> applicantId.equals(app.getApplicantId()));

                if (matched) {
                    result.add(job.toDTO());
                }
            }
        }

        return result;
    }

    @Override
    public List<JobDTO> getSuitableJobs(Long profileId) {

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile Not Found"));

        List<String> userSkills =
                profile.getSkills() != null
                        ? profile.getSkills()
                        : new ArrayList<>();

        List<Job> jobs = jobRepository.findAll();

        List<JobDTO> suitableJobs = new ArrayList<>();

        for (Job job : jobs) {

            if(job.getSkillsRequired() == null ||
                    job.getSkillsRequired().isEmpty()) {
                continue;
            }

            long matchedSkills =
                    job.getSkillsRequired()
                            .stream()
                            .filter(userSkills::contains)
                            .count();

            int matchPercentage =
                    (int)((matchedSkills * 100.0)
                            / job.getSkillsRequired().size());

            JobDTO dto = job.toDTO();

            dto.setMatchPercentage(matchPercentage);

            suitableJobs.add(dto);

        }

        suitableJobs.sort(
                (a,b) ->
                        b.getMatchPercentage()
                                .compareTo(a.getMatchPercentage())
        );
        return suitableJobs;
    }
}
