package com.jobportal.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

    private Long id;

    private Long senderProfileId;

    private Long receiverProfileId;

    private String message;

    private String sentAt;
}