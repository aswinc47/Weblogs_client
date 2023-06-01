import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{
  constructor(public modal:ModalService,public us:UserService,public router:Router){}
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.modal.unregister('loginreq')
  }
  homeCreate(){
    if(localStorage.getItem('email')){
      this.router.navigateByUrl('/blogs/create')
    }else{
      this.modal.toggleVisibility('auth')
    }
  }
  openLogin(event:Event){
    event.preventDefault()
    this.modal.toggleVisibility('loginreq')
    this.modal.toggleVisibility('auth')
  }
}
