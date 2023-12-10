import { Component, EventEmitter, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.css'],
})
export class CreateblogComponent {
  options: AnimationOptions = {
    path: '/assets/success.json',
  };

  showAnimation: boolean = false;

  title: string = '';
  content: string = '';

  INITIAL_POST: Post = {
    id: 0,
    title: '',
    content: '',
    user_id: 0,
  };
  Posts: Post[] = [];
  postModel: Post = this.INITIAL_POST;
  error: string = '';

  constructor(
    private postService: PostService,
    private storageService: StorageService
  ) {}

  addPost(form: NgForm) {
    const loggedInUser = this.storageService.getLoggedInUser();
    if (loggedInUser && loggedInUser.id) {
      const pst: Post = {
        id: 0,
        title: this.title,
        content: this.content,
        user_id: loggedInUser.id,
      };

      this.postService.addPost(pst).subscribe({
        next: (response: any) => {
          if (response && response.data) {
            this.Posts.push(response.data);
            this.title = '';
            this.content = '';
            form.resetForm();
          }
        },
        error: (err) => {
          console.error('An error occurred while adding a post:', err);
        },
      });
    } else {
      console.error('User ID not found or user not logged in.');
    }

    this.showAnimation = true;

    setTimeout(() => {
      this.showAnimation = false;
    }, 2000);
  }
}
