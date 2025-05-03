package com.example.video_game_sorter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.databind.util.StdDateFormat;

@SpringBootApplication
public class VideoGameSorterApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideoGameSorterApplication.class, args);
	}
	
	@Bean
	public ObjectMapper objectMapper() {
		return JsonMapper.builder()
				.findAndAddModules()
				.defaultDateFormat(new StdDateFormat())
				.build();
	}
}
