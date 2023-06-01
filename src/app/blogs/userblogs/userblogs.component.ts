import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-userblogs',
  templateUrl: './userblogs.component.html',
  styleUrls: ['./userblogs.component.css']
})
export class UserblogsComponent implements OnInit{
  constructor(public bs:BlogService){}
ngOnInit(): void {
  
  const email = JSON.parse(localStorage.getItem('email') || '')
  this.bs.getblogsbyUser(email).subscribe((result:any)=>{
    this.userBlogs = result.data
    this.totalBlogs = this.userBlogs.length
  })
}
userBlogs:any
totalBlogs: string | undefined
page:number = 1
}
