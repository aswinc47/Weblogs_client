import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit{
  constructor(public us:UserService,public modal:ModalService){}
  ngOnInit(): void {
    this.us.loggedin = true
  }
}
