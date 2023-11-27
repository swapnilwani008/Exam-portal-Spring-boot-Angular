import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService:UserService, private snack:MatSnackBar){}

  public user={
    username:"",
    password:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:""
  };


  ngOnInit(): void{}

  formSubmit(){
    console.log(this.user);
    if(this.user.username==""||this.user.username==null){
      // alert("User is required")
      this.snack.open("Username is Required !!",'',{
        duration:3000,
        
      });
      return;
    }

    //validate 
    

    // adduser: userService
  this.userService.addUser(this.user).subscribe(
    (data:any) => {
      //sucess
      console.log(data);
      // alert('success');

      var resetForm:HTMLFormElement;
resetForm= <HTMLFormElement>document.getElementById('formid');
if(resetForm)
    resetForm.reset();



      Swal.fire('Successfully Registered ','User id is '+data.id,'success');
    },
    (error) => {
      console.log(error);
      // alert('something went wrong');
      this.snack.open('something went Wrong !!','',{
        duration:3000,
      })
    }
  )
  }
}
