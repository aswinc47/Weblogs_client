import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html',
  styleUrls: ['./viewblog.component.css']
})
export class ViewblogComponent implements OnInit,OnDestroy {
  
  constructor(public modal:ModalService, public ar:ActivatedRoute,public router:Router,public bs:BlogService , public us:UserService){}

  blog:any
  email:any
  uname:any
  userblog:boolean | undefined
  liked:boolean | undefined
  showDelete = false
  blogContent: any;

  ngOnInit(): void {
    this.us.isLoggedin()
    this.modal.register('deleteConfirm')

    this.email = JSON.parse(localStorage.getItem('email') || '')
    this.uname = JSON.parse(localStorage.getItem('uname') || '')

    this.ar.params.subscribe(data=>{
      const id = data['id']
      this.bs.viewBlog(id).subscribe((result:any)=>{
        this.blog = result.data
        console.log(this.blog);
        
        this.userblog = this.blog.email==this.email ? true : false
        this.liked = this.blog.liked.includes(this.uname)
        this.blogContent = result.data.blogContent
        console.log(result.data.blogContent)
        console.log(this.blogContent)
      })
    })
  }

  ngOnDestroy():void{
    this.modal.unregister('deleteConfirm')
  }

  toggleDelete(event:Event){
    event.preventDefault()
    this.showDelete=true
    this.modal.toggleVisibility('deleteConfirm')}

  deleteBlog(){
    this.bs.deleteBlog(this.blog._id).subscribe((result:any)=>{
      this.modal.register('blogmodal')
      this.router.navigateByUrl('blogs')
      this.modal.toggleVisibility('blogmodal')
      this.bs.blogmessage = 'Blog Successfully deleted'
    },result=>{
      this.us.alertBox(true,'danger',result.error.message)
    })
  }

  like(){
    this.ar.params.subscribe(data=>{
      const id = data['id']
      this.bs.like(id).subscribe((result:any)=>{
        this.blog = result.data
        this.liked = this.blog.liked.includes(this.uname)
      })
    })
  }

}
