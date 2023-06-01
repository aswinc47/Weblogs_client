import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { ViewblogComponent } from './viewblog/viewblog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateblogComponent } from './createblog/createblog.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { HomecenterComponent } from './homecenter/homecenter.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UserblogsComponent } from './userblogs/userblogs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteComponent } from './modals/delete/delete.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    BlogsComponent,
    ViewblogComponent,
    CreateblogComponent,
    LeftsidebarComponent,
    RightsidebarComponent,
    HomecenterComponent,
    FilterPipe,
    UserblogsComponent,
    DeleteComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class BlogsModule { }
