import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit,OnDestroy{

  constructor(public bs:BlogService, public router:Router, public modal:ModalService,public us:UserService){}

  userBlogs:any=[]
  showLogout = false
  userblognumbers:any
  email:any
  username:any

  ngOnInit(): void {
    this.us.isLoggedin()

    this.email = JSON.parse(localStorage.getItem('email') || '')
    this.username = JSON.parse(localStorage.getItem('uname') || '')
    this.bs.getblogsbyUser(this.email).subscribe((result:any)=>{
      this.userBlogs = result.data.slice(0,5)
      this.userblognumbers = result.data.length
      
    })
  }
  ngOnDestroy(){
    this.modal.unregister('logout')
  }

  openLogoutModal(event:Event){
    event.preventDefault()
    this.showLogout = true
    this.modal.register('logout')
    this.modal.toggleVisibility('logout')
  }

}
