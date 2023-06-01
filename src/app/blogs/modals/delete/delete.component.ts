import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit,OnDestroy{

  constructor(public ar:ActivatedRoute, public bs:BlogService,public router:Router,public modal:ModalService){}

  id:any

  ngOnInit(): void {
      this.modal.register('deleteConfirm')
      this.ar.params.subscribe(data=>{
        this.id = data['id']})
  }

  ngOnDestroy(): void {
      this.modal.unregister('deleteConfirm')
  }

  deleteBlog(){
    this.bs.deleteBlog(this.id).subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('blogs')
    })
  }

}
