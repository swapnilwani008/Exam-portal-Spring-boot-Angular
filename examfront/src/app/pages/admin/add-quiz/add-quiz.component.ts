import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories=[
    {
      cid:null,
      title:null
    }
  ];

  QuizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    },
  };


  constructor(private _cate:CategoryService, private snack:MatSnackBar, private _quiz:QuizService){}
  ngOnInit(): void {
    this._cate.categories().subscribe(
      (data:any)=>{
        //categories load
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !','error in loading data from server', 'error')
      }
    )
  }
  //
  public addQuiz(){
    if(this.QuizData.title.trim()=='' || this.QuizData.title==null){
      this.snack.open('Title Required !!','',{
        duration:3000,
      }
      );
      return;
    }
    

    //call server
    return this._quiz.addQuiz(this.QuizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','Quiz Added','success')
        this.QuizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:''
          },
        };
      }
    ,
    (error)=>{
      Swal.fire('Error!','Error while adding quiz', 'error')
      console.log(error);
    }
      );


  }

}
