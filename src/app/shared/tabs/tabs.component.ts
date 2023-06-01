import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit{


  @ContentChildren(TabComponent)tabs ?: QueryList<TabComponent>

  constructor(public userService:UserService){}

  ngAfterContentInit(): void {
    const activetabs = this.tabs?.filter(tab=>tab.active)

    if(!activetabs || activetabs.length === 0){
      this.setActive(this.tabs!.first)
    }
  }

  setActive(tab:TabComponent): boolean{
    this.tabs?.forEach(tab=>tab.active=false)
    this.userService.showAlert = false
    tab.active = true
    return false
  }
}
