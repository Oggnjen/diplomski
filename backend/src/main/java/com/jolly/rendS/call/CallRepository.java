package com.jolly.rendS.call;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CallRepository extends JpaRepository<Call, Long> {
    Optional<Call> findByUniqueCode(String uniqueCode);
}
