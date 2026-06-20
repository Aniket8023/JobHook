package com.jobportal.repository;

import com.jobportal.dto.NotificationStatus;
import com.jobportal.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    public List<Notification> findByUserIdAndStatus(Long userId, NotificationStatus status);

    List<Notification> findByUserIdOrderByTimestampDesc(Long userId);

    List<Notification> findByUserIdAndStatusOrderByTimestampDesc(
            Long userId,
            NotificationStatus status
    );
}
