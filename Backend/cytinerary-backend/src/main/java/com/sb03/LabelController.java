package com.sb03;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.sb03.modal.Label;
import com.sb03.repository.LabelRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;

@Api(value = "LabelController", description = "Controller for handling HTTP requests related to labels")
@RestController
@CrossOrigin(origins = "*")
public class LabelController {

	@Autowired
	private LabelRepository labelRepository;

  @ApiOperation(value = "Retrieve labels associated to specific user")
  @Transactional
	@PostMapping("/getLabels")
	public @ResponseBody Collection<Label> getLabels(@RequestBody Map<String, Object> payload) {
		return labelRepository.getLabels((String) payload.get("userId"));
	}

  @ApiOperation(value = "Retrieve color associated to specific label")
	@PostMapping("/getLabelColor")
	public @ResponseBody Collection<Label> getLabelColor(@RequestBody Map<String, Object> payload) {
		return labelRepository.getLabelColor((String) payload.get("label"));
	}

  @ApiOperation(value = "Delete a specific label from label table")
	@Transactional
	@PostMapping("/deleteLabel")
	public @ResponseBody String deleteLabel(@RequestBody Map<String, Object> payload) {
		labelRepository.deleteLabel((String) payload.get("label"));
		return ((String) payload.get("label") + "deleted");
	}

  @ApiOperation(value = "Add a new label to the label table")
	@Transactional
	@PostMapping("/addLabel")
	public @ResponseBody String addLabel(@RequestBody Map<String, Object> payload) {
		labelRepository.addLabel((String) payload.get("userId"), (String) payload.get("label"), (String) payload.get("color"));
		return ("Label " + ((String) payload.get("label")) + " Added");
	}

}
