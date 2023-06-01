import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy{

  constructor(public modal:ModalService, public userService:UserService){}

  ngOnInit(): void {
      this.modal.register('auth')
  }

  ngOnDestroy(): void {
      this.modal.unregister('auth')
  }
  
}
