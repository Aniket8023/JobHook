package com.jobportal.dto;

import com.jobportal.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	private Long id;
	@NotBlank(message="{user.name.absent}")
	private String name;
	@NotBlank(message="{user.email.absent}")
	@Email(message = "{user.email.invalid}")
	private String email;
	@NotBlank(message="{user.password.absent}")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$", message = "{user.password.invalid}")
	private String password;
	private AccountType accountType;
	private Long profileId;

	
	

//	public UserDTO(Long id, @NotBlank(message = "{user.name.absent}") String name,
//			@NotBlank(message = "{user.email.absent}") @Email(message = "{user.email.invalid}") String email,
//			@NotBlank(message = "{user.password.absent}") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$", message = "{user.password.invalid}") String password,
//			AccountType accountType, Long profileId) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.email = email;
//		this.password = password;
//		this.accountType = accountType;
//		this.profileId = profileId;
//	}


	public User toEntity() {
		return new User(this.id,this.name,this.email,this.password,this.accountType,this.profileId);
	}


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
