import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homecenter',
  templateUrl: './homecenter.component.html',
  styleUrls: ['./homecenter.component.css']
})
export class HomecenterComponent implements OnInit{
  constructor(public bs:BlogService,public us:UserService,public router:Router){}

  blogs:[]=[]
  filteredBlogs:any
  searchKey:any
  bannerBlog:any
  active: boolean | undefined;

  // pagination
  totalBlogs: string | undefined
  page:number = 1


  ngOnInit(): void {

    this.bs.getblogs().subscribe((result:any)=>{
      this.blogs = result.data
      this.bannerBlog = this.blogs[Math.floor(Math.random()*this.blogs.length)]
      this.filterblogs('all')
      document.getElementById("all")?.classList.add('active')
    })
    this.bs.search.subscribe(value=>{
      this.searchKey=value
      console.log(this.searchKey);
    })
    this.us.loggedin = false
  }

  filterblogs(category:string){
    document.querySelector(".active")?.classList.remove("active")
    document.getElementById(category)?.classList.add('active')
    this.filteredBlogs = this.blogs.filter((blog: any)=>blog.category ==category || category=="all")
    this.totalBlogs = this.filteredBlogs.length
  }
  
}
