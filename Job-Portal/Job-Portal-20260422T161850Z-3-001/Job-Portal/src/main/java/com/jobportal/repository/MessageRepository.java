package com.jobportal.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jobportal.entity.Message;

public interface MessageRepository
        extends MongoRepository<Message,Long>{

    @Query("{'$or':[{'senderProfileId':?0,'receiverProfileId':?1},{'senderProfileId':?1,'receiverProfileId':?0}]}")
    List<Message> getConversation(
            Long sender,
            Long receiver
    );

}