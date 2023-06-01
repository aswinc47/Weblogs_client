import { Injectable } from '@angular/core';

interface IModal{
  id:string,visible:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  private modal:IModal[] = []

  register(id:string){
    this.modal.push({id,visible:false})
  }

  unregister(id:string){
    this.modal = this.modal.filter(n=>n.id !== id)
  }

  isVisible(id:string){
    return Boolean(this.modal.find(n=>n.id == id)?.visible)
  }

  toggleVisibility(id:string){
    const modalid = this.modal.find(n=>n.id==id)
    if(modalid){
      modalid.visible = !modalid.visible
    }
  }


}
