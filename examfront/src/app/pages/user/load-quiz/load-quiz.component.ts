import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  catId:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _snack :MatSnackBar){}
  
  
  ngOnInit(): void {
    
    this._route.params.subscribe((params)=>{
      // console.log(params)
      this.catId = params['catId'];
      if(this.catId==0){
        console.log("load all quiz");
        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.quizzes=data;
            console.log(this.quizzes);
            
          },
          (error)=>{
            console.log(error);
            this._snack.open("Error in Loading data","",{duration:3000,})
          }
        )
      }
      else{
        console.log("specifice quiz only");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data)=>{
            this.quizzes=data;
          },
          (error)=>{
            console.log(error);
            this._snack.open("Error in loading data","",{duration:3000})
            
          }
        );
      }
    });

    
  }
}
