package com.jobportal.entity;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sequence")
@Data
public class Sequence {
    @Id
    private String id;
    private Long seq;
    
    
    
	public Sequence(String id, Long seq) {
		super();
		this.id = id;
		this.seq = seq;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Long getSeq() {
		return seq;
	}
	public void setSeq(Long seq) {
		this.seq = seq;
	}
    
    
    
}
