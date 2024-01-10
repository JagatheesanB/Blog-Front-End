import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { CommentService } from 'src/app/service/comment.service';
import { AppResponse } from 'src/app/model/appResponse';
import { Comment } from 'src/app/model/comment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/empty.json',
  };

  error: string = '';
  posts: Post[] = [];
  comments: Comment[] = [];
  zoomedPost: any;

  search: string = '';
  userPosts: Post[] = [];
  totalPosts: Post[] = [];

  displayedPostsCount = 3;

  showAnimation: boolean = false;

  loadMoreClicked: boolean = false;

  showButtons: boolean = true;
  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.getPost().subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.posts = response.data;
          this.totalPosts = response.data;

          this.userPosts = response.data;
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
        // console.log(response);
        this.router.navigate(['/readblog', postId]);
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }

  zoomIn(post: any) {
    this.zoomedPost = post;
    this.applyZoom(true);
  }

  zoomOut(post: any) {
    if (this.zoomedPost === post) {
      this.applyZoom(false);
    }
  }

  applyZoom(zoomIn: boolean) {
    const scale = zoomIn ? 'scale(1.1)' : 'scale(1)';
    const element = this.zoomedPost;
    if (element) {
      element.style.transform = scale;
      element.style.transition = 'transform 0.2s ease-in-out';
    }
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  getLoggedInUserName(): String {
    return this.authService.getLoggedInUser()?.username || 'Guest';
  }

  filterArray() {
    this.posts = this.totalPosts.filter((post: Post) => {
      return post.title.toLowerCase().includes(this.search.toLowerCase());
    });

    this.showAnimation = this.posts.length === 0;

    this.showButtons = !this.search.trim();
  }

  sortProductsAToZ() {
    this.userPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortProductsZToA() {
    this.userPosts.sort((a, b) => b.title.localeCompare(a.title));
  }

  loadMorePosts() {
    this.displayedPostsCount += 3;
    this.loadMoreClicked = true;
  }
}
