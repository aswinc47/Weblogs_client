import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.css']
})
export class RightsidebarComponent implements OnInit{
  constructor(public bs:BlogService){}
  topBlogs:any=[]
  ngOnInit(): void {
    this.bs.getblogs().subscribe((result:any)=>{
      console.log(result.data);
      this.topBlogs = result.data.sort((n1:any,n2:any)=>n2.liked.length - n1.liked.length).slice(0,6)
    })
  }
}
