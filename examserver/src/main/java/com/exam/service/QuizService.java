package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

public interface QuizService {

	public Quiz addQuiz(Quiz quiz);
	public Quiz updateQuiz(Quiz quiz);
	public Set<Quiz> getQuizzes();
	public Quiz getQuiz(Long quiz);
	public void deleteQuiz(Long quizId);
	public List<Quiz> getQuizzesOfCategory(Category category);
	
	public List<Quiz> getActiveQuizze();
	public List<Quiz> getActiveQuizzesOfCategory(Category c);
}
