import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { StorageService } from 'src/app/service/storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userblog',
  templateUrl: './userblog.component.html',
  styleUrls: ['./userblog.component.css'],
})
export class UserblogComponent implements OnInit {
  INITIAL_POST: Post = {
    id: 0,
    title: '',
    content: '',
    user_id: 0,
  };
  posts: Post[] = [];
  postModel: Post = this.INITIAL_POST;
  createBlogComponent: any;

  constructor(
    private postService: PostService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadPostsForLoggedInUser();
  }
  loadPostsForLoggedInUser(): void {
    const loggedInUserId = this.getLoggedInUserId();

    if (loggedInUserId) {
      this.postService.getPost().subscribe({
        next: (response: AppResponse) => {
          if (response && response.data) {
            this.posts = response.data.filter(
              (post: Post) =>
                post.user_id === this.storageService.getLoggedInUser().id
            );
          } else {
            console.error('ID is Mismatch', response);
          }
        },
        error: (err) => {
          console.log('An error occurred:', err);
        },
        complete: () => console.log('No further actions happening.'),
      });
    }
  }

  onSubmit(form: NgForm): void {
    console.log('Updated Post Data:', this.postModel);
    this.postService.putPost(this.postModel).subscribe({
      next: (response: any) => {
        this.posts = response.data;
        console.log('Post updated successfully:', response);
        this.loadPostsForLoggedInUser();
        this.postModel = this.INITIAL_POST;
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }

  onEdit(post: Post) {
    this.postModel = { ...post };
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

  isLoggedInUser(post: Post, userId: any): boolean {
    return post.user_id === userId;
  }

  getLoggedInUserId(): any {
    return this.storageService.getLoggedInUser();
  }
}
