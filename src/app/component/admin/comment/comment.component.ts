import { Component } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Comment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  error: string = '';
  comments: Comment[] = [];
  userDetails: User[] = [];
  posts: Post[] = [];

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.commentService.getComment().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.comments = response.data;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err) => {
        console.log('An error occurred:', err);
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
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe({
      next: (response: any) => {
        console.log('Comment deleted:', response);
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error deleting comment:', err);
      },
    });
  }

  getUsername(userId: number): string {
    const user = this.userDetails.find((user) => user.id === userId);
    return user ? user.username : '';
  }

  getPostTitle(postId: number): string {
    const post = this.posts.find((post) => post.id === postId);
    return post ? post.title : '';
  }

 
}
