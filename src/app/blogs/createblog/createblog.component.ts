import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UploadimgService } from 'src/app/services/uploadimg.service';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.css']
})
export class CreateblogComponent implements OnInit,OnDestroy{

  constructor(public router:Router,public modal:ModalService, public ar:ActivatedRoute, public bs:BlogService , public uploadService:UploadimgService, public us:UserService ){ }
  ngOnDestroy(): void {
    this.modal.unregister('cancelSubmit')
  }

  imgSrc!: String
  file : any
  edit=false
  Blogid:any;

  ngOnInit(): void {
    this.us.isLoggedin()
    this.router.events.subscribe((val:any)=>{
      this.modal.register('cancelSubmit')
      if(localStorage.getItem('email') && (val.routerEvent.url.includes('edit'))){
        this.edit=true
        this.ar.params.subscribe(val=>{
          this.Blogid = val.id
          this.bs.viewBlog(val.id).subscribe((result:any)=>{
            this.patchValues(result.data)
          })
        })
      }else{
        console.log('failure');
      }
    })
  }

  patchValues(data:any){
    this.title.patchValue(data.title)
    this.description.patchValue(data.description)
    this.blogContent.patchValue(data.blogContent)
    this.category.patchValue(data.category)
  }

  showPreview( event: any): void{
    if(event.target.files.length>0){
        this.file = event.target.files[0]
        this.imgSrc = URL.createObjectURL(this.file)
    }
}

  title = new FormControl('',[Validators.required,Validators.maxLength(50)])
  description = new FormControl('',[Validators.required,Validators.maxLength(100)])
  blogContent = new FormControl('',[Validators.required,Validators.minLength(150)])
  category = new FormControl('',[Validators.required])
  image = new FormControl('')

  blogCreationForm = new FormGroup({
    title : this.title,
    description : this.description,
    blogContent : this.blogContent,
    category : this.category,
    image : this.image
  })

  cancel(event:Event){
    event.preventDefault()
    this.bs.createblogmessage = 'Are you sure? Entered inputs will be gone.'
    this.bs.createblogbutton = 'cancel'
    this.modal.toggleVisibility('cancelSubmit')
  }


  goHome(){
    this.modal.toggleVisibility('cancelSubmit')
    this.router.navigateByUrl('/blogs')
  }

  createBlog(){
    const file_data = this.file
    if(file_data){
      const data = new FormData();
      data.append('file',file_data)
      data.append('upload_preset','angular_cloudinary')
      data.append('cloud_name','dbychllpr')
  
      this.uploadService.uploadImage(data).subscribe(response =>{
        this.image.patchValue(response.secure_url)
        if(this.blogCreationForm.valid){
          let title = this.blogCreationForm.value.title
          let category = this.blogCreationForm.value.category
          let description = this.blogCreationForm.value.description
          let blogContent = this.blogCreationForm.value.blogContent
          let image = this.blogCreationForm.value.image
          let uname = JSON.parse(localStorage.getItem('uname') || '') 
          let email = JSON.parse(localStorage.getItem('email') || '')
          let id = this.Blogid
  
          if(this.edit){
            this.bs.updateBlog(title,category,description,blogContent,image,id).subscribe((result:any)=>{
              console.log(result.message)
              this.bs.createblogmessage = result.message
              this.bs.createblogbutton = 'gohome'
              this.modal.toggleVisibility('cancelSubmit')
            },result=>{
              this.bs.createblogmessage = result.error.message
              this.bs.createblogbutton = 'gohome'
              this.modal.toggleVisibility('cancelSubmit')
            })
          }else{
            this.bs.createBlog(title,category,description,blogContent,image,uname,email).subscribe((result:any)=>{
              this.bs.createblogmessage = 'Blog updated'
              this.bs.createblogbutton = 'gohome'
              this.modal.toggleVisibility('cancelSubmit')
            },result=>{
              this.bs.createblogmessage = result.error.message
              this.bs.createblogbutton = 'gohome'
              this.modal.toggleVisibility('cancelSubmit')
            })
          }
        }
    })
    }else{
      this.bs.createblogmessage = 'Upload image first.'
      this.bs.createblogbutton = 'upload'
      this.modal.toggleVisibility('cancelSubmit')
    }
}
}
