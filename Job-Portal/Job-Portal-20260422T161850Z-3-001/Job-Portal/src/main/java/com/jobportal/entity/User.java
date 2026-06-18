package com.jobportal.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.jobportal.dto.AccountType;
import com.jobportal.dto.UserDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private Long id;

    private String name;

    @Indexed(unique = true)  // Ensure email is unique in MongoDB
    private String email; 

    private String password;

    private AccountType accountType;
    private Long profileId;

    public UserDTO toDTO() {
        return new UserDTO(this.id, this.name, this.email, this.password, this.accountType,this.profileId);
    }

    
//	public User(Long id, String name, String email, String password, AccountType accountType, Long profileId) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.email = email;
//		this.password = password;
//		this.accountType = accountType;
//		this.profileId = profileId;
//	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}
    
    
}
