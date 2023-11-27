import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  questions=[{
    quesId:null,
    content:null,
    option1:null,
    option2:null,
    option3:null,
    option4:null,
    answer:null

  }];
  constructor(private _route: ActivatedRoute, private _questions:QuestionService) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._questions.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
        
      },
      (error)=>{
        console.log(error);
        
      }
    );
  }

  //delete question
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:"Are you sure ?? "
    }).then((result)=>{
      if(result.isConfirmed){
        //confirm
        this._questions.deleteQuestion(qid).subscribe(
          (data:any)=>{
            Swal.fire("Success","Question Deleted ","success");
            this.questions = this.questions.filter((q)=>q.quesId!=qid)
          },
          (error)=>{
            Swal.fire("Error !!", "Error occured during deleting", 'error')
            console.log(error);
            
          }
        );
      }
    }
      
    )
  }


}
