import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,OnDestroy{

  showDeletemodal = false

  constructor(public modal:ModalService,public userService:UserService){}

  email = new FormControl('',[Validators.required,Validators.email])
  password = new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")])

  deleteForm = new FormGroup({
    email:this.email,
    password:this.password
  })

  deleteAccount(){
    if(this.deleteForm.valid){
      let email = this.deleteForm.value.email
      let password = this.deleteForm.value.password

      this.userService.deleteAccount(email,password).subscribe((result:any)=>{
        this.userService.logout()
        this.userService.showloginreq = true
        this.userService.homemessage = 'Your account has been deleted !'
        this.modal.register('loginreq')
        this.modal.toggleVisibility('loginreq')
      },result=>{
        this.userService.alertBox(true,"danger",result.error.message)
      })
    }
  }


  ngOnInit(): void {
    this.modal.register('deleteAccount')
    this.userService.showAlert = false
  }
  ngOnDestroy(): void {
    this.modal.unregister('deleteAccount')
  }

  deleteModalOpen(event:Event){
    event.preventDefault()
    this.showDeletemodal = true
    this.modal.toggleVisibility('deleteAccount')
  }


}
