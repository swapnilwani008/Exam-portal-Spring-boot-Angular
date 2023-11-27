import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  quizzes=[
    {
      qid:null,
      title:null,
      description:null,
      maxMarks:null,
      numberOfQuestions:null,
      active:null,
      category:{
        title:null
      }
    }]

  constructor(private _quiz:QuizService){}
  
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data !', 'error');
      }
    );
  }

  //delete 
  deleteQuiz(qid: any){
    Swal.fire({
      icon:'info', 
      title:'Are you Sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      //delete 
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qid).subscribe(
          (data:any)=>{
            this.quizzes = this.quizzes.filter((quiz)=> quiz.qid!=qid)
            Swal.fire("Sucess","Quiz deleted Successfully", 'success')
          },
          (error)=>{
            Swal.fire("Error !! ","Error in deleting quiz", 'error')
          }
        );
      }
    })
  }

}
