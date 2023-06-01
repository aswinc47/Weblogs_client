import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient,public router:Router,public modal:ModalService) { }

  // nav setting
  loggedin=false
  showloginreq = false
  homemessage:any

  

  // modal alert
  showAlert = false
  alertColor = 'success'
  alertText = ''
  categories =[
    'Sports','Technology','Food',
    'Travel','Fitness',
    'Fashion','Lifestyle','Photography',
    'Personal','Parenting','Music',
    'Business','Art','Book',
    'Finance','Politics','Religion','Other'
  ]

  hideAuth = true

  isLoggedin(){
    const data = localStorage.getItem('email')
    if(!data){
      this.modal.register('loginreq')
      this.modal.register('auth')
      this.router.navigateByUrl('/')
      this.showloginreq = true
      this.homemessage = 'You need to login first!'
      this.modal.toggleVisibility('loginreq')
      this.hideAuth = false
    }else{
      this.hideAuth = true
    }
  }

  alertBox(show:boolean,alertColor:string,message:string){
    this.showAlert = show
    this.alertColor = alertColor
    this.alertText = message
  }

  register(uname:any,email:any,password:any){
    const data = {uname,email,password}
    return this.http.post('http://localhost:3000/register',data)
  }

  login(email:any,password:any){
    const data = {email,password}
    return this.http.post('http://localhost:3000/login',data)
  }

  deleteAccount(email:any,password:any){
    const data = {email,password}
    return this.http.post('http://localhost:3000/deleteaccount',data)
  }

  logout(){
    localStorage.removeItem('uname')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    this.router.navigateByUrl('/')
  }

}
