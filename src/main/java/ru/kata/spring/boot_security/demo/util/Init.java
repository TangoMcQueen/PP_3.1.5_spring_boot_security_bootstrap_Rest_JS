package ru.kata.spring.boot_security.demo.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import javax.annotation.PostConstruct;

@Component
public class Init {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public Init(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    @Transactional
    public void doInit() {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        roleRepository.save(roleAdmin);
        roleRepository.save(roleUser);

        User user = new User();
        user.setAge(30);
        user.setEmail("Admin@mail.ru");
        user.setFirstName("Misha");
        user.setLastName("Adminov");
        user.setPassword(passwordEncoder.encode("admin"));
        user.getRoles().add(roleRepository.findRoleByRole("ROLE_ADMIN"));
        userRepository.save(user);

        user = new User();
        user.setAge(20);
        user.setEmail("User@mail.ru");
        user.setFirstName("Serega");
        user.setLastName("Userov");
        user.setPassword(passwordEncoder.encode("user"));
        user.getRoles().add(roleRepository.findRoleByRole("ROLE_USER"));
        userRepository.save(user);
    }
}
