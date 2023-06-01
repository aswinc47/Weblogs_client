import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const option = {
  headers : new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogmessage:any
  showblogmodal:any
  createblogmessage:any
  createblogbutton:any

  constructor(public http:HttpClient) { }

  search = new BehaviorSubject("")

  getToken(){
    const token = JSON.parse(localStorage.getItem('token') || '')
    const headers = new HttpHeaders
    if(token){
      option.headers =  headers.append('access_token',token)
    }
    return option
  }

  createBlog(title:any,category:any,description:any,blogContent:any,image:any,uname:any,email:any){
    const data = {title,category,description,blogContent,image,uname,email}
    console.log(data)
    return this.http.post('http://localhost:3000/createblog',data,this.getToken())
  }

  updateBlog(title:any,category:any,description:any,blogContent:any,image:any,id:any){
    const data = {title,category,description,blogContent,image,id}
    console.log(data)
    return this.http.post('http://localhost:3000/updateblog',data,this.getToken())
  }
 
  getblogs(){
    return this.http.get('http://localhost:3000/getblogs',this.getToken())
  }
  
  getblogsbyUser(email:any){
    const data = {email}
    return this.http.post('http://localhost:3000/getblogsbyuser', data ,this.getToken())
  }

  viewBlog(id:any){
    const data = {id}
    return this.http.post('http://localhost:3000/viewblog', data,this.getToken())
  }

  like(id:any){
    const uname = JSON.parse(localStorage.getItem("uname") || "")
    const data = {uname , id}
    return this.http.post('http://localhost:3000/like',data,this.getToken())
  }

  deleteBlog(id:any){
    this.showblogmodal = true
    console.log(id);
    return this.http.delete('http://localhost:3000/delete/'+id,this.getToken())
  }
}
