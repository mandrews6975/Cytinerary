package com.sb03;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class TestController {
	
	@RequestMapping("/")
	public String res() {
		return "Hello";
	}
	
}