package com.btec.quanlykhohang_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class



QuanlykhohangApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuanlykhohangApiApplication.class, args);
	}

}
