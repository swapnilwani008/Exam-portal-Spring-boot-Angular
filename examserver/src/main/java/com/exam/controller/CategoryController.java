package com.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.exam.model.exam.Category;
import com.exam.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	//add category
	@PostMapping("/")
	public ResponseEntity<?> addCatgory(@RequestBody Category category){
		Category category2= this.categoryService.addCategory(category);
		return ResponseEntity.ok(category2);
	}
	
	//get category
	@GetMapping("/{categoryid}")
	public Category getCategory(@PathVariable("categoryid") Long categoryId) {
		return this.categoryService.getCategory(categoryId);
	}
	
	//get all categories
	@GetMapping("/")
	 public ResponseEntity<?> getCategories(){
		return ResponseEntity.ok(this.categoryService.getCategories());
	}
	
	//update 
	@PutMapping("/")
	public Category updateCategory(@RequestBody Category category) {
		return this.categoryService.updateCategory(category);
	}
	
	//delete 
	@DeleteMapping("/{id}")
	public void deletecategory(@PathVariable("id") Long id) {
		this.categoryService.deleCategory(id);
	}
	
}
