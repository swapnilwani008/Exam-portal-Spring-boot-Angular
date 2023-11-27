import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit{
startQuiz() {
  Swal.fire({
    title: "Do you want to Start Quiz?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Start",
    
    icon:'info'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this._router.navigate(['/start/'+this.qid])
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
  qid:any;
  quiz: any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _snack:MatSnackBar, private _router:Router){}
  
  ngOnInit(): void {
     this.qid=this._route.snapshot.params['qid'];
    //  console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.quiz=data;
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error in Loading Quiz","",{duration:3000})
        
      }
    )
     
  }

}
