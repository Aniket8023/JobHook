package com.jobportal.service;


import com.jobportal.dto.NotificationDTO;
import com.jobportal.entity.Notification;
import com.jobportal.exception.JobPortalException;

import java.util.List;

public interface NotificationService {
    public void sendNotification(NotificationDTO notificationDTO) throws JobPortalException;
    public List<Notification> getUnreadNotifications(Long userId);

    public void readNotification(Long id) throws JobPortalException;
}
