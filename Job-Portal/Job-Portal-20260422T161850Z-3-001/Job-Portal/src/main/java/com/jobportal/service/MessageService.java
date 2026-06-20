package com.jobportal.service;

import com.jobportal.dto.MessageDTO;
import com.jobportal.exception.JobPortalException;


import java.util.List;


public interface MessageService {

    MessageDTO sendMessage(MessageDTO dto)
            throws JobPortalException;

    List<MessageDTO> getConversation(
            Long senderId,
            Long receiverId
    );

    List<MessageDTO> getAllUserMessages(
            Long profileId
    );
}