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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'createblog', component: CreateblogComponent },
  { path: 'userblog', component: UserblogComponent },
  { path: 'readblog/:postId', component: ReadblogComponent },
  { path: 'admincomment', component: CommentComponent },
  { path: 'adminpost', component: PostComponent },
  { path: 'adminuser', component: UserComponent },
  { path: 'post/:id', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
