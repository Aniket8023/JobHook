package com.jobportal.api;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.exception.JobPortalException;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.jobportal.dto.UserDTO;
import com.jobportal.service.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/users")
public class UserAPI {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDTO) throws JobPortalException {
        try {
            UserDTO createdUser = userService.registerUser(userDTO);
            return ResponseEntity.ok(createdUser);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.badRequest().body("Error: Email already exists!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO>loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException{
        return new ResponseEntity<>(userService.loginUser(loginDTO), HttpStatus.OK);
    }

    @PostMapping("/changePass")
    public ResponseEntity<ResponseDTO>changePassword(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException{
        return new ResponseEntity<>(userService.changePassword(loginDTO), HttpStatus.OK);
    }

    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDTO>sendOtp(@PathVariable @Email(message = "{user.email.invalid}") String email) throws Exception{
        userService.sendOtp(email);
        return new ResponseEntity<>(new ResponseDTO("OTP sent successfully."), HttpStatus.OK);
    }

    @GetMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<ResponseDTO>verifyOtp(@PathVariable @Email(message = "{user.email.invalid}") String email,@PathVariable @Pattern(regexp = "^[0-9]{6}$",message = "{otp.invalid}") String otp) throws JobPortalException{
        userService.verifyOtp(email,otp);
        return new ResponseEntity<>(new ResponseDTO("OTP has been verified."), HttpStatus.OK);
    }
}
