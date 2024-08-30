package com.jolly.rendS.call;

import com.jolly.rendS.call.dtos.CreatedCallDto;
import com.jolly.rendS.call.dtos.JoinedCallDto;
import com.jolly.rendS.call.dtos.MemberDto;
import com.jolly.rendS.sdp.SdpService;
import com.jolly.rendS.sdp.dtos.SdpPayload;
import com.jolly.rendS.users.User;
import com.jolly.rendS.utils.CustomBadRequestException;
import com.jolly.rendS.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CallServiceImpl implements CallService {

    private final CallRepository callRepository;
    private final CallMembersRepository callMembersRepository;
    private final CallIdentifierGenerator identifierGenerator;
    private final SdpService sdpService;
    private final UserUtils userUtils;

    @Override
    public CreatedCallDto initiateCall() {
        String callIdentifier = identifierGenerator.generate();
        var user = userUtils.getLoggedUser();
        var call = Call.builder()
                .initiator(user)
                .uniqueCode(callIdentifier)
                .build();
        callRepository.save(call);

        String callerIdentifier = identifierGenerator.generate();
        CallMember callMember = CallMember.builder()
                .call(call)
                .user(user)
                .userIdentifier(callerIdentifier)
                .active(true)
                .build();
        callMembersRepository.save(callMember);

        return new CreatedCallDto(callIdentifier, callerIdentifier, user.getName(), user.getSurname(),
                user.getEmail());
    }

    @Override
    public JoinedCallDto joinCall(String callId) {
        Call call = callRepository.findByUniqueCode(callId)
                .orElseThrow(() -> new CustomBadRequestException("Call does not exist"));

        List<CallMember> members = callMembersRepository.getAllByCallAndActiveIsTrue(call);
        var user = userUtils.getLoggedUser();
        String memberId = identifierGenerator.generate();
        CallMember callMember = CallMember.builder()
                .user(user)
                .call(call)
                .userIdentifier(memberId)
                .active(true)
                .build();
        callMembersRepository.save(callMember);
        return new JoinedCallDto(callId, memberId, user.getName(), user.getSurname(),
                user.getEmail(),
                members.stream()
                .map((member) -> MemberDto.builder()
                        .email(member.getUser().getEmail())
                        .name(member.getUser().getName())
                        .surname(member.getUser().getSurname())
                        .memberId(member.getUserIdentifier())
                        .build()).collect(Collectors.toList()));
    }

    @Override
    public void exitCall(String callId) {
        Call call = callRepository.findByUniqueCode(callId)
                .orElseThrow(() -> new CustomBadRequestException("Call does not exist"));
        List<CallMember> callMembers = callMembersRepository.getAllByCallAndActiveIsTrue(call);
        User user = userUtils.getLoggedUser();
        CallMember callMember = callMembersRepository.findByCallAndUser(call, user)
                .orElseThrow(() -> new CustomBadRequestException("Call does not exist"));
        if(call.getInitiator().equals(user)) {
            callMembers.forEach(cm -> cm.setActive(false));
            callMembersRepository.deleteAll(callMembers);
        } else {
            callMember.setActive(false);
            callMembersRepository.save(callMember);
        }
        notifyMembersAboutExitingCall(callMembers, user, callMember);

    }


    private void notifyMembersAboutExitingCall(List<CallMember> callMembers, User user, CallMember callMember) {
        for(var cm : callMembers) {
            sdpService.provideSdp(new SdpPayload(new MemberDto(user, callMember.getUserIdentifier()), "", "END_CALL"), cm.getUserIdentifier());
        }
    }
}
