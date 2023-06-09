//package ru.kata.spring.boot_security.demo.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import ru.kata.spring.boot_security.demo.model.User;
//
//import java.util.Optional;
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//    private final UserService userService;
//    @Autowired
//    public UserDetailsServiceImpl(UserService userService) {
//        this.userService = userService;
//    }
//
//    @Override
//    @Transactional(readOnly = true)
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        Optional<User> optionalUser = userService.getUserByEmail(email);
//        if (optionalUser.isEmpty()) {
//            throw new UsernameNotFoundException(String.format("User with mail %s not found", email));
//        } else {
//            User user = optionalUser.get();
//            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), user.getAuthorities());
//        }
//    }
//}
