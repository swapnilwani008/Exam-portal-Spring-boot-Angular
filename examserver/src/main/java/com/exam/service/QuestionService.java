package com.exam.service;

import java.util.Set;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionService {

	public Question addQuestion(Question question);
	public Question updateQuestion(Question question);
	public Set<Question> getQuestions();
	public Question getQuestion(Long question);
	public Set<Question> getQuestionsOfQuiz(Quiz quiz);
	public void deleteQuestion(Long questionId);
	public Question get(Long questionId);

}
