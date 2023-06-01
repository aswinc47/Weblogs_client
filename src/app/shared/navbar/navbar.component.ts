import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public modal:ModalService,public bs:BlogService, public us:UserService,public router:Router){
    
  }

  @Input()isLoggedin = true
  searchTerm:any

  search(){
    this.router.navigateByUrl('/blogs')
    this.bs.search.next(this.searchTerm)
  }
  
  ngOnInit(): void {
  }

  openModal($event:Event){
    $event.preventDefault()
    this.modal.toggleVisibility('auth')
  }
}
