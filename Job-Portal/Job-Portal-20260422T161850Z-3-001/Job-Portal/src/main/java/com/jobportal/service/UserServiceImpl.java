package com.jobportal.service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.entity.OTP;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.OTPRepository;
import com.jobportal.utility.Data;
import com.jobportal.utility.Utilities;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NotificationService notificationService;

    @Override
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException  {
        Optional<User> optional = userRepository.findByEmail(userDTO.getEmail());
        if(optional.isPresent())throw new JobPortalException("USER_FOUND");
        userDTO.setProfileId(profileService.createProfile(userDTO.getEmail()));
        userDTO.setId(Utilities.getNextSequence("users"));
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = userDTO.toEntity();
        user = userRepository.save(user);
        return user.toDTO();
    }

    @Override
    public UserDTO getUserByEmail(String email) throws JobPortalException {
         return userRepository.findByEmail(email).orElseThrow(()->new JobPortalException("USER_NOT_FOUND")).toDTO();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException{
        User user=userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()->new JobPortalException("USER_NOT_FOUND"));
        if(!passwordEncoder.matches(loginDTO.getPassword(),user.getPassword())) throw new JobPortalException("INVALID_CREDENTIALS");
        return user.toDTO();
    }

    @Override
    public Boolean sendOtp(String email)throws Exception{
        User user=userRepository.findByEmail(email).orElseThrow(()->new JobPortalException("USER_NOT_FOUND"));
        MimeMessage mm=mailSender.createMimeMessage();
        MimeMessageHelper message=new MimeMessageHelper(mm,true);
        message.setTo(email);
        message.setSubject("Your OTP Code");
        String genOtp=Utilities.generateOTP();
        OTP otp=new OTP(email,genOtp, LocalDateTime.now());
        otpRepository.save(otp);
        message.setText(Data.getMessageBody(genOtp,user.getName()),true);
        mailSender.send(mm);
        return true;
    }

    @Override
    public Boolean verifyOtp(String email,String otp) throws JobPortalException {
        OTP otpEntity=otpRepository.findById(email).orElseThrow(()->new JobPortalException("OTP_NOT_FOUND"));
        if(!otpEntity.getOtpCode().equals(otp))throw new JobPortalException("OTP_INCORRECT");
        return true;
    }

    @Override
    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException {
        User user=userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()->new JobPortalException("USER_NOT_FOUND"));
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);
        NotificationDTO noti = new NotificationDTO();
        noti.setUserId(user.getId());
        noti.setMessage("Password Reset Successfull");
        noti.setAction("Password Reset");
        notificationService.sendNotification(noti);
        return new ResponseDTO("Password changed successfully.");
    }

    @Scheduled(fixedRate = 3000)
    public void removeExpiredOTPs(){
        LocalDateTime expiry=LocalDateTime.now().minusMinutes(5);
        List<OTP>expiredOTPs=otpRepository.findByCreationTimeBefore(expiry);
        if(!expiredOTPs.isEmpty()){
            otpRepository.deleteAll(expiredOTPs);
            System.out.println("Removed"+expiredOTPs.size()+"expired OTPs.");
        }
    }

}
