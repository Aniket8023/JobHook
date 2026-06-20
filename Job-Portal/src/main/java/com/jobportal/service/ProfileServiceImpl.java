package com.jobportal.service;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.entity.Profile;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Long createProfile(String email) throws JobPortalException{
        Profile profile=new Profile();
        profile.setId(Utilities.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
        return profileRepository.findById(id).orElseThrow(()->new JobPortalException("PROFILE_NOT_FOUND")).toDTO();
    }

    @Override
    public ProfileDTO UpdateProfile(ProfileDTO profileDTO) throws JobPortalException {

        Profile existingProfile = profileRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        // ✅ Update only non-null fields
        if (profileDTO.getName() != null)
            existingProfile.setName(profileDTO.getName());

        if (profileDTO.getEmail() != null)
            existingProfile.setEmail(profileDTO.getEmail());

        if (profileDTO.getJobTitle() != null)
            existingProfile.setJobTitle(profileDTO.getJobTitle());

        if (profileDTO.getCompany() != null)
            existingProfile.setCompany(profileDTO.getCompany());

        if (profileDTO.getLocation() != null)
            existingProfile.setLocation(profileDTO.getLocation());

        if (profileDTO.getAbout() != null)
            existingProfile.setAbout(profileDTO.getAbout());


        if (profileDTO.getPicture() != null && !profileDTO.getPicture().isEmpty())
            existingProfile.setPicture(
                    Base64.getDecoder().decode(profileDTO.getPicture())
            );

        if (profileDTO.getResume() != null && !profileDTO.getResume().isEmpty())
            existingProfile.setResume(
                    Base64.getDecoder().decode(profileDTO.getResume())
            );

        if (profileDTO.getSkills() != null)
            existingProfile.setSkills(profileDTO.getSkills());

        if (profileDTO.getExperiences() != null)
            existingProfile.setExperiences(profileDTO.getExperiences());

        if (profileDTO.getCertifications() != null)
            existingProfile.setCertifications(profileDTO.getCertifications());

        if (profileDTO.getSavedJobs() != null)
            existingProfile.setSavedJobs(profileDTO.getSavedJobs());

        profileRepository.save(existingProfile);

        return existingProfile.toDTO();
    }

    @Override
    public ProfileDTO uploadResume(Long id, String resumeBase64) throws JobPortalException {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));

        profile.setResume(Base64.getDecoder().decode(resumeBase64)); // ✅ Convert Base64 string to byte[]
        profileRepository.save(profile);

        return profile.toDTO();
    }

    @Override
    public List<ProfileDTO> getAllProfiles() {
        return profileRepository.findAll().stream().map((x)->x.toDTO()).toList();
    }

}
