package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    private Long id;
    private Long applicantId;
    private LocalDateTime interviewTime;
    private ApplicationStatus applicationStatus;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getApplicantId() {
		return applicantId;
	}
	public void setApplicantId(Long applicantId) {
		this.applicantId = applicantId;
	}
	public LocalDateTime getInterviewTime() {
		return interviewTime;
	}
	public void setInterviewTime(LocalDateTime interviewTime) {
		this.interviewTime = interviewTime;
	}
	public ApplicationStatus getApplicationStatus() {
		return applicationStatus;
	}
	public void setApplicationStatus(ApplicationStatus applicationStatus) {
		this.applicationStatus = applicationStatus;
	}
    
    
    
    
}
