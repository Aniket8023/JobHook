package com.jobportal.utility;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorInfo {
    private String errorMessage;
    private Integer errorCode;
    private LocalDateTime timeStamp;
	public String getErrorMessage() {
		return errorMessage;
		
		
	}
//	public ErrorInfo(String errorMessage, Integer errorCode, LocalDateTime timeStamp) {
//		super();
//		this.errorMessage = errorMessage;
//		this.errorCode = errorCode;
//		this.timeStamp = timeStamp;
//	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public Integer getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(Integer errorCode) {
		this.errorCode = errorCode;
	}
	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}
    
    
}
