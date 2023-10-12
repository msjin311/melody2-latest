package com.acorn.melody2.controller;

import com.acorn.melody2.entity.UserAccount;
import com.acorn.melody2.entity.UserAccountSelf;
import com.acorn.melody2.services.UserAccountServiceSelf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-accounts-self")
public class UserAccountBasicControllerSelf {
    private final UserAccountServiceSelf userAccountServiceSelf;

    @Autowired
    public UserAccountBasicControllerSelf(UserAccountServiceSelf userAccountServiceSelf) {
        this.userAccountServiceSelf = userAccountServiceSelf;
    }

    @GetMapping
    //@GetMapping은 불러오기
    //GET를 통해 해당 리소스를 조회하고 해당 도큐먼트에 대한 자세한 정보를 가져온다.
    public ResponseEntity<List<UserAccountSelf>> findAllUserAccount() {
        //ResponseEntity<List<UserAccountSelf>>형식에 findAllUserAccount메소드를 사용하여 모든 유저의 정보를 불러옴
        List<UserAccountSelf> userAccounts = userAccountServiceSelf.findAllUserAccounts();
        //userAccountServiceSelf에있는 findAllUserAccounts메서드를 활용해서 모든 사용자 정보를 List<UserAccountSelf>형식에 변수userAccounts로 가져옴
        return ResponseEntity.ok(userAccounts);
        //ResponseEntity에 정상적으로 데이터를 가져왔을시 받아온 데이터가 저장된 변수 userAccounts를 리턴해줌
    }

    @GetMapping("/{id}")
    //@GetMapping은 불러오기
    public ResponseEntity<UserAccountSelf> findUserAccountById(@PathVariable Long id) {
        //findUserAccountById메서드를 사용하여 ResponseEntity<UserAccountSelf>타입에 넣어오는데 @PathVariable를 사용하여 Long타입에 id를 URL주소에서 가져와서 사용함
        //@PathVariable는 URL주소내에서 변수 값을 추출하여 사용하게해줌
        Optional<UserAccountSelf> userAccount = userAccountServiceSelf.findUserAccountById(id);
        //userAccountServiceSelf에서 선언한 findUserAccountById()메서드를 사용하여 특정 id의 유저 정보를 가져와서 Optional<UserAccountSelf> 타입의 userAccount라는 변수에 저장함
        return userAccount.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        //위에서 찾아온 특정유저 데이터인 userAccount를 map()사용해 ResponseEntity로 return하는데 정상적으로 데이터가 불러와졌을시 ok(200)신호를 받아아서 정상 처리, 아닐시 notFound()로 값이 없는 상태를 가져옴
    }

    @PostMapping
    //@PostMapping은 생성
    public ResponseEntity<UserAccountSelf> createUserAccount(@RequestBody UserAccountSelf userAccountSelf) {
        //ResponseEntity<UserAccountSelf>라는 형식의 @RequestBody를 통해 UserAccountSelf타입 변수userAccountSelf를 createUserAccount메소드를 사용하여 새로운 유저 정보를 생성함
        //@RequestBody는 json형식으로 받아온 데이터를 자동으로 java형식으로 변환하여 관리할 수 있게 해주는 어노테이션
        UserAccountSelf createUserAccount = userAccountServiceSelf.createUserAccount(userAccountSelf);
        //userAccountServiceSelf에서 선언한 createUserAccount()메서드를 사용하여 신규 유저의 정보를 추가한뒤 UserAccountSelf형식의 createUserAccount라는 변수로 저장함
        return new ResponseEntity<>(createUserAccount, HttpStatus.CREATED);
        //new ResponseEntity<>를 새로 만들어 위에서 생성한 createUserAccount를 넣어 return함
        //HttpStatus.CREATED는 정상적으로 처리되었다고 HTTP응답에 상태를 나타내는코드
    }

    @PutMapping("/{id}")
    //@PutMapping은 수정
    public ResponseEntity<UserAccountSelf> updateUserAccount(@PathVariable Long id, @RequestBody UserAccountSelf updatedUserAccount){
        //ResponseEntity<UserAccountSelf>라는 형식의 @PathVariable를 통해 Long타입 변수id와 UserAccountSelf타입의 변수updatedUserAccount를 updateUserAccount메소드를 사용하여 수정된 변수를 만들어 저장함
        UserAccountSelf updatedAccount = userAccountServiceSelf.updateUserAccount(id, updatedUserAccount);
        //userAccountServiceSelf에서 선언한 updateUserAccount메소드를 사용하여 id와 updatedUserAccount를 넣은 수정된 정보를 updatedAccount에 저장함
        return ResponseEntity.ok(updatedAccount);
        //ResponseEntity타입에 수정되어 저장한 변수 updatedAccount를 올바르게 return함
    }

    @DeleteMapping("/{id}")
    //@DeleteMapping은 삭제
    public ResponseEntity<Void> deleteUserAccount(@PathVariable Long id) {
        //deleteUserAccount메서드를 @PathVariable사용하여 Long타입에 변수id를 받아 해당 id에 정보를 삭제함
        //정보를 삭제후 별도의 데이터반환이 아닌 HTTP응답만 하면 되기때문에 Void타입이 들어감
        //Void는 실제로는 아무것도 반환하지 않는 것을 나타냄
        userAccountServiceSelf.deleteUserAccount(id);
        //userAccountServiceSelf에서 선언한 deleteUserAccount메소드에 id를 받아 삭제함
        return ResponseEntity.noContent().build();
        //데이터가 정상적으로 삭제되었지만 별도의 데이터반환은 없으며 HTTP응답으로만 정상처리되었음을 return함
    }
}
