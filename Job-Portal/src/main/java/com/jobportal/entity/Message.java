package com.jobportal.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "messages")
public class Message {

    @Id
    private Long id;

    private Long senderProfileId;

    private Long receiverProfileId;

    private String message;

    private LocalDateTime sentAt;

    private Boolean seen = false;
}