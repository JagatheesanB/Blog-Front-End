import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { CreateblogComponent } from './component/createblog/createblog.component';
import { UserblogComponent } from './component/userblog/userblog.component';
import { ReadblogComponent } from './component/readblog/readblog.component';
import { CommentComponent } from './component/admin/comment/comment.component';
import { PostComponent } from './component/admin/post/post.component';
import { UserComponent } from './component/admin/user/user.component';
import { PostDetailsComponent } from './component/admin/post-details/post-details.component';
import { LoadmoreComponent } from './component/loadmore/loadmore.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  {
    path: 'createblog',
    component: CreateblogComponent,
    canActivate: [authGuard],
  },
  { path: 'userblog', component: UserblogComponent, canActivate: [authGuard] },
  {
    path: 'readblog/:postId',
    component: ReadblogComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admincomment',
    component: CommentComponent,
    canActivate: [authGuard],
  },
  { path: 'adminpost', component: PostComponent, canActivate: [authGuard] },
  { path: 'adminuser', component: UserComponent, canActivate: [authGuard] },
  { path: 'adminhome', component: AdminHomeComponent },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'loadmore', component: LoadmoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
