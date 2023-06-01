import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public userService:UserService , public router:Router,public modal:ModalService){ }

  email = new FormControl('',[Validators.required,Validators.email])
  password = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')])

  loginForm = new FormGroup({
    email:this.email,
    password:this.password
  })

  login(){
    if(this.loginForm.valid){
      let email = this.loginForm.value.email
      let password = this.loginForm.value.password

      this.userService.login(email,password).subscribe((result:any)=>{
        this.userService.alertBox(true,"success",result.message)
        this.modal.toggleVisibility('auth')
        localStorage.setItem('uname',JSON.stringify(result.currentUser))
        localStorage.setItem('email',JSON.stringify(result.currentEmail))
        localStorage.setItem('token',JSON.stringify(result.token))
        this.router.navigateByUrl('blogs')
      },result => {
        this.userService.alertBox(true,"danger",result.error.message)
      })
    }
  }

}
