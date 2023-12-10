import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { CommentService } from 'src/app/service/comment.service';
import { AppResponse } from 'src/app/model/appResponse';
import { Comment } from 'src/app/model/comment';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  error: string = '';
  posts: Post[] = [];
  comments: Comment[] = [];

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
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
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });

    // comment

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
  }

  navigateToPost(postId: number) {
    this.postService.getPostById(postId).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/readblog', postId]);
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }
}
