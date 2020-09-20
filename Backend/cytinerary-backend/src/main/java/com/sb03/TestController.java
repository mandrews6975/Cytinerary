package com.sb03;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class TestController {

	@RequestMapping("/")
	public String res() {
		return "index.html";
	}

}
