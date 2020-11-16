package com.sb03;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class TestController {

	@RequestMapping({"/", "/home", "/sharedschedules", "/login"})
	public String res() {
		return "index.html";
	}

}
