import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  error: string = '';
  posts: Post[] = [];
  userDetails: User[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postService.getPost().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.posts = response.data;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });

    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: User[] = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  getUsername(userId: number): string {
    const user = this.userDetails.find((user) => user.id === userId);
    return user ? user.username : '';
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe({
      next: (response: any) => {
        console.log('Comment deleted:', response);
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error deleting comment:', err);
      },
    });
  }

  viewPost(id: number): void {
    this.router.navigate(['/post', id]);
  }
}
