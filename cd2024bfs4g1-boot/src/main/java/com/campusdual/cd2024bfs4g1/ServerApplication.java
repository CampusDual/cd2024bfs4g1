package com.campusdual.cd2024bfs4g1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.ontimize.jee.server.security.encrypt.IPasswordEncryptHelper;
import com.ontimize.jee.server.security.encrypt.PasswordBCryptHelper;

import java.util.TimeZone;

@SpringBootApplication
public class ServerApplication {

	public static void main(final String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("GMT+01:00"));
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public IPasswordEncryptHelper passwordEncryptHelper() {
		return new PasswordBCryptHelper();
	}
}
