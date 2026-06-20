package com.jobportal.service;

import com.jobportal.dto.MessageDTO;
import com.jobportal.entity.Message;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.MessageRepository;
import com.jobportal.utility.Utilities;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class MessageServiceImpl
        implements MessageService {

    @Autowired
    private MessageRepository repo;

    @Override
    public MessageDTO sendMessage(
            MessageDTO dto
    ) throws JobPortalException {

        Message msg = new Message();

        msg.setId(
                Utilities.getNextSequence("messages")
        );

        msg.setSenderProfileId(
                dto.getSenderProfileId()
        );

        msg.setReceiverProfileId(
                dto.getReceiverProfileId()
        );

        msg.setMessage(
                dto.getMessage()
        );

        msg.setSentAt(
                LocalDateTime.now()
        );

        repo.save(msg);

        dto.setId(msg.getId());
        dto.setSentAt(msg.getSentAt().toString());

        return dto;
    }

    @Override
    public List<MessageDTO> getConversation(
            Long senderId,
            Long receiverId
    ){

        return repo
                .getConversation(senderId,receiverId)
                .stream()
                .sorted((a,b)->a.getSentAt().compareTo(b.getSentAt()))
                .map(m->new MessageDTO(
                        m.getId(),
                        m.getSenderProfileId(),
                        m.getReceiverProfileId(),
                        m.getMessage(),
                        m.getSentAt().toString()
                ))
                .toList();
    }

    @Override
    public List<MessageDTO> getAllUserMessages(
            Long profileId
    ) {

        return repo
                .getAllUserMessages(profileId)
                .stream()
                .map(m -> new MessageDTO(
                        m.getId(),
                        m.getSenderProfileId(),
                        m.getReceiverProfileId(),
                        m.getMessage(),
                        m.getSentAt().toString()
                ))
                .toList();
    }
}