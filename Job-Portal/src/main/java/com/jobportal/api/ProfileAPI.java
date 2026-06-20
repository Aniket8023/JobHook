package com.jobportal.api;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.ProfileService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

//import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/profiles")
public class ProfileAPI {
    @Autowired
    private ProfileService profileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDTO>getProfile(@PathVariable Long id)throws JobPortalException {
        return new ResponseEntity<>(profileService.getProfile(id), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProfileDTO>>getAllProfile()throws JobPortalException {
        return new ResponseEntity<>(profileService.getAllProfiles(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ProfileDTO>updateProfile(@RequestBody ProfileDTO profileDTO)throws JobPortalException {
        return new ResponseEntity<>(profileService.UpdateProfile(profileDTO), HttpStatus.OK);
    }



    @PutMapping("/uploadResume/{id}")
    public ResponseEntity<ProfileDTO> uploadResume(
            @PathVariable Long id,
            @RequestParam("resume") MultipartFile resumeFile) throws JobPortalException, IOException {

        // Convert file to Base64
        String resumeBase64 = Base64.getEncoder().encodeToString(resumeFile.getBytes());

        // Call service to upload
        return new ResponseEntity<>(profileService.uploadResume(id, resumeBase64), HttpStatus.OK);
    }


}
