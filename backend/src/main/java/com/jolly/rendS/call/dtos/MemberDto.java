package com.jolly.rendS.call.dtos;

import com.jolly.rendS.users.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDto {
    String email;
    String name;
    String surname;
    String memberId;

    public MemberDto(User user, String memberId) {
        this.email = user.getEmail();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.memberId = memberId;
    }
}
