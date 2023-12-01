import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Comment } from 'src/app/model/comment';
import { Post } from 'src/app/model/post';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-readblog',
  templateUrl: './readblog.component.html',
  styleUrls: ['./readblog.component.css'],
})
export class ReadblogComponent implements OnInit {
  post: Post | undefined;
  Comments: Comment[] = [];
  comment: string = '';
  posts: Post[] = [];
  newComment: string = '';

  id: number = 0;
  title: string = '';
  content: string = '';
  user_id: number = 0;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const postId = params['postId'];
      console.log(postId);
      if (postId) {
        this.getPostById(postId);
        // this.loadPostAndComments(postId);
      }
    });
  }

  fetchComments(): void {
    this.commentService.getComment().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.Comments = response.data;
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

  // loadPostAndComments(postId: number) {
  //   this.getPostById(postId);
  //    this.fetchCommentsForPost(postId);
  // }

  // fetchCommentsForPost(postId: number) {
  //   this.commentService.getCommentsByPostId(postId).subscribe({
  //     next: (response: any) => {
  //       if (response && response.data) {
  //         this.Comments = response.data;
  //       }
  //     },
  //     error: (err) => {
  //       console.error('An error occurred while fetching comments:', err);
  //     },
  //     complete: () => console.log('Comment fetching completed.'),
  //   });
  // }

  getPostById(postId: number) {
    console.log('called');
    this.postService.getPostById(postId).subscribe({
      next: (response: AppResponse) => {
        if (
          response &&
          response.data &&
          response.data.posts &&
          response.data.posts.length > 0
        ) {
          this.post = response.data.posts[0];
          console.log(this.post);
        }
      },
      error: (err) => {
        console.error('Error fetching post:', err);
      },
    });
  }

  // getPostById(postId: number): void {
  //   this.postService.getPostById(postId).subscribe(
  //     (response) => {
  //       this.post = response.data.posts[0];
  //       console.log(response.data);
  //     },
  //     (error) => {
  //       console.error('Error fetching post:', error);
  //     }
  //   );
  // }

  addComment(form: NgForm) {
    const loggedInUser = this.storageService.getLoggedInUser();
    if (loggedInUser && loggedInUser.id) {
      const commt: Comment = {
        id: 0,
        comment: this.comment,
        user_id: loggedInUser.id,
        post_id: this.post?.id || 0,
      };
      this.commentService.addComment(commt).subscribe({
        next: (response: any) => {
          if (response && response.data) {
            this.Comments.push(response.data);
            this.newComment = '';
            form.resetForm();
            this.fetchComments();
          }
        },
        error: (err) => {
          console.error('An error occurred while adding a comment:', err);
        },
      });
    }
  }
}
