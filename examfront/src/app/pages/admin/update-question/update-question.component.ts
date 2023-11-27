import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{

  public Editor = ClassicEditor;
  quesId: any;
  qTitle: any;
  question = {
    quiz: { qid: null, title:null },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _question:QuestionService, private _router:Router,private _snack:MatSnackBar){}
  ngOnInit(): void {
    this.quesId = this._route.snapshot.params['quesid'];
    
    console.log(this.qTitle);
    
    this._question.getQuestion(this.quesId).subscribe((data:any)=>{
      this.question = data;
      console.log(this.question);

      
    },
    (error)=>{
      console.log(error);
      
    }
    );

  }



  //update form submit

  public updateQuestion(){

    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open("Please Enter Question Content","",{duration:3000})
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }

    this._question.updateQuestion(this.question).subscribe((data)=>
    {
      Swal.fire("Success","Question Updated Successfully",'success').then((e)=>{
        this._router.navigate(['/admin/view-questions', this.question.quiz.qid, this.question.quiz.title]);
      })
    },
    (error)=>{
      Swal.fire("Error!!","Question not Updated",'error')
      console.log(error);
    }
    );
  }

}
