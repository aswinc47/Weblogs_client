import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Registervalidators } from '../validators/registervalidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(public userService:UserService){ }

  uname = new FormControl('',[Validators.required,Validators.minLength(4)])
  email = new FormControl('',[Validators.required,Validators.email])
  password = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')])
  confirm_password = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')])

  registerForm = new FormGroup({
    uname : this.uname,
    email : this.email,
    password : this.password,
    confirm_password : this.confirm_password
  },[Registervalidators.match('password','confirm_password')])

  register(){
    if(this.registerForm.valid){

      let uname = this.registerForm.value.uname
      let email = this.registerForm.value.email
      let password = this.registerForm.value.password

      this.userService.register(uname,email,password).subscribe((result:any)=>{
        this.userService.alertBox(result.status,"success",result.message)
      },result => {
        this.userService.alertBox(true,"danger",result.error.message)
      })
    }
  }

}
