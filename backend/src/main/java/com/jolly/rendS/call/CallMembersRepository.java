package com.jolly.rendS.call;

import com.jolly.rendS.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CallMembersRepository extends JpaRepository<CallMember, Long> {
    List<CallMember> getAllByCallAndActiveIsTrue(Call call);
    Optional<CallMember> findByCallAndUser(Call call, User user);
}
