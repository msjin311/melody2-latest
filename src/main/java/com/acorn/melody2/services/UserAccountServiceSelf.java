package com.acorn.melody2.services;
//팩키지 지정

import com.acorn.melody2.entity.UserAccount;
import com.acorn.melody2.entity.UserAccountSelf;
//엔티티 클래스를 사용하기 위해 해당 클래스를 import 합니다.
import com.acorn.melody2.repository.UserAccountRepositorySelf;
// 인터페이스를 사용하기 위해 해당 인터페이스를 import 합니다.
import org.springframework.beans.factory.annotation.Autowired;
//스프링 프레임워크에서 빈을 주입하기 위해 @Autowired 어노테이션을 import 합니다.
import org.springframework.stereotype.Service;
//해당클래스가 스프링에서 관리하는 Service Bean임을 나타내기 위해 @Service 어노테이션을 import함
import java.util.List;
import java.util.Optional;

@Service
//UserAccountServiceSelf 클래스는 Spring의 @Service 어노테이션을 사용하여 서비스 빈으로 등록
//이 클래스는 사용자 계정 관련 비즈니스 로직을 처리함
//Service가 알맞은 정보를 가공하는 과정을 '비즈니스 로직을 수행한다.' 라고함
public class UserAccountServiceSelf {
    private final UserAccountRepositorySelf userAccountRepositorySelf;

    @Autowired
    public UserAccountServiceSelf(UserAccountRepositorySelf userAccountRepositorySelf){
        this.userAccountRepositorySelf = userAccountRepositorySelf;
    }
    //현재 클래스가 필요로한 UserAccountRepositorySelf에 대해서 @Autowired를 통해 의존성을 주입함

    public List<UserAccountSelf> findAllUserAccounts() {
        return userAccountRepositorySelf.findAll();
    }
    //모든 유저의 정보를 List형식으로 findAllUserAccounts메서드를 사용해 가져옴

    public Optional<UserAccountSelf> findUserAccountById(Long id) {
        return userAccountRepositorySelf.findById(id);
    }
    //특정 유저의 아이디를 findUserAccountById메서드를 사용해 가져오는데 Optional형식을 사용해서 Null값을 방지함

    public UserAccountSelf createUserAccount(UserAccountSelf userAccountSelf) {
        return userAccountRepositorySelf.save(userAccountSelf);
    }
    //새로운 유저의 정보를 createUserAccount라는 메서드를 이용해 추가한뒤, userAccountRepositorySelf에 save를 사용해서 저장함

    public UserAccountSelf updateUserAccount(Long id, UserAccountSelf updateUserAccount) {
        updateUserAccount.setUserAccount_ID(id);
        //update를 하는 유저의 id를 기존에 있던 id에 대입하여 서로 같은 데이터를 뽑아서 수정시킴
        return userAccountRepositorySelf.save(updateUserAccount);
    }
    //updateUserAccount메서드를 사용하여 변경시킨 뒤 변경한 updateUserAccount를 저장함

    public void deleteUserAccount(Long id) {
        //delete는 리턴값이 없이 삭제하는 기능이므로 void가 들어감
        userAccountRepositorySelf.deleteById(id);
    }
    //deleteUserAccount메서드를 사용해 입력받은 id와 같은 id를 삭제함
}
