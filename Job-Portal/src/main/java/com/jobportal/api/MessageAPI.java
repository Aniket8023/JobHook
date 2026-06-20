package com.jobportal.api;

import com.jobportal.dto.MessageDTO;
import com.jobportal.entity.Message;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin
public class MessageAPI {

    @Autowired
    private MessageService service;

    @PostMapping("/send")
    public ResponseEntity<MessageDTO>
    sendMessage(
            @RequestBody MessageDTO dto
    ) throws JobPortalException {

        return new ResponseEntity<>(
                service.sendMessage(dto),
                HttpStatus.OK
        );
    }

    @GetMapping("/{sender}/{receiver}")
    public ResponseEntity<List<MessageDTO>>
    getConversation(
            @PathVariable Long sender,
            @PathVariable Long receiver
    ){

        return new ResponseEntity<>(
                service.getConversation(
                        sender,
                        receiver
                ),
                HttpStatus.OK
        );
    }
}