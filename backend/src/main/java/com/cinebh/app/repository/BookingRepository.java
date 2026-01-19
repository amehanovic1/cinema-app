package com.cinebh.app.repository;

import com.cinebh.app.entity.Booking;
import com.cinebh.app.entity.User;
import com.cinebh.app.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    int deleteByExpiresAtBeforeAndStatusNot(LocalDateTime now, BookingStatus status);

    List<Booking> findByUserAndStatusAndExpiresAtAfter(User user, BookingStatus status, LocalDateTime now);
}
