package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner{

	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		System.out.println("Strating code");
		 
//		User user = new User();
//		user.setFirstName("Swapnil");
//		user.setLastName("Wani");
//		user.setUsername("swapnilwani008");
//		user.setPassword(bCryptPasswordEncoder.encode("abc"));
//		user.setEmail("mrswapnilwani@gmail.com");
//		user.setProfile("default.png");
//		
//		Role  role1= new Role();
//		role1.setRoleId(44L);
//		role1.setRoleName("ADMIN");
//		
//		Set<UserRole> UserRoleSet=new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		UserRoleSet.add(userRole);
//		User user1 = this.userService.createUser(user, UserRoleSet);
//		System.out.println(user1.getUsername());
		
		
		
	}

}
