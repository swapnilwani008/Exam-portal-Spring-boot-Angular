import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  
  constructor(private snack: MatSnackBar, private login: LoginService, private router : Router) {

  }
  ngOnInit(): void {

  }
  formSubmit() {
    console.log("login btn clicked");
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required !!', '', { duration: 3000, });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required !!', '', { duration: 3000, });
      return;
    }

    //request server to generate token
    this.login.genearteToken(this.loginData).subscribe(
      (data: any) => {
        console.log("sucess");
        console.log(data);

        //login .. 
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect 
            //if admin then go to admin dahsboard if normal then normal dashbaoard

            if(this.login.getUserRole()=='ADMIN'){
              //admin dashboard
              this.router.navigate(['/admin']);
              // window.location.href='/admin';
              this.login.loginStatusSubject.next(true);
            }
            else if(this.login.getUserRole()=='NORMAL'){
              //normal user
              this.router.navigate(['/user-dashboard/0']);
              // window.location.href='/user-dashboard';
              this.login.loginStatusSubject.next(true);
            }
            else{
              //logout
              this.login.logout();

            }

          }
        )
      },
      (error) => {
        console.log("error !");
        console.log(error);
        this.snack.open("Invalid Details!! Try again",'',{
          duration:3000,
          
        })
      }

    );

  }

}
