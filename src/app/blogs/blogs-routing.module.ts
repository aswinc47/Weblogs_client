import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { ViewblogComponent } from './viewblog/viewblog.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { UserblogsComponent } from './userblogs/userblogs.component';

const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'blog/:id', component: ViewblogComponent },
  {path:'create',component:CreateblogComponent},
  {path:'userblog',component:UserblogsComponent},
  {path:'edit/:id',component:CreateblogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
