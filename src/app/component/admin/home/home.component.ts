import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Comment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit {
  // options: AnimationOptions = {
  //   path: '/assets/rocket.json',
  // };

  totalUsers: number = 0;
  totalPosts: number = 0;
  totalComments: number = 0;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let users: User[] = response.data;
        this.totalUsers = users.length;
      },
      error: (err) => {
        console.error('Error loading total users:', err);
      },
    });

    // posts
    this.postService.getPost().subscribe({
      next: (response: any) => {
        let posts: Post[] = response.data;
        this.totalPosts = posts.length;
      },
      error: (err) => {
        console.error('Error loading total posts:', err);
      },
    });

    // comments

    this.commentService.getComment().subscribe({
      next: (response: any) => {
        let comments: Comment[] = response.data;
        this.totalComments = comments.length;
      },
      error: (err) => {
        console.error('Error in loading total comments:', err);
      },
    });
  }
}
