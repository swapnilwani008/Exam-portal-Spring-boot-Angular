import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  qid:any;
  questions:any;

  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit= false;
  timer:any;

  constructor(private locationSt:LocationStrategy, private _route:ActivatedRoute, private _question:QuestionService){}
  
  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log('qid: ',this.qid);
    this.loadQuestions();
    
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>{
      this.questions=data;
      this.timer = this.questions.length*0.5*60;
      // this.questions.forEach((q:any)=>{
      //   q['givenAnswer']='';
      // })
      console.log(this.questions);
      this.startTimer();
      
      
    },
    (error)=>{
      Swal.fire('Error !','Error in Loading questions','error')
    }
    
    );
  }

  preventBackButton(){
    history.pushState({}, '', location.href);    
    this.locationSt.onPopState(()=>{
      history.pushState({}, '', location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title: "Do you want to Submit Quiz ?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      
      icon:'info'
    }).then((e)=>
    {
      if(e.isConfirmed){
        this.evalQuiz();
        }
    })
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        Swal.fire({
          title: "Time Up !!",
          text: "Quiz Submitted Succesfully",
          icon: "success"
        });
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60)
    let ss = this.timer - mm * 60
    return `${mm} Min : ${ss} Sec`;
  }

  evalQuiz(){
    //calculation on client side

    // this.isSubmit=true;
    // this.questions.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer){
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot +=marksSingle;
    //   }
    //   if(q.givenAnswer.trim()!=''){
    //     this.attempted++;
    //   }

       
    // });
    // console.log("correct answer: "+ this.correctAnswers);
    //   console.log("marks :"+this.marksGot);


    //caulation on server
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted;
        this.isSubmit=true;
        
      },
      (error)=>{
        console.log(error);
        
      }
    );

  }
  printPage(){
    window.print();
  }
}
