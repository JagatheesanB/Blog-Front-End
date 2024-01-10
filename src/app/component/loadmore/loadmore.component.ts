import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-loadmore',
  templateUrl: './loadmore.component.html',
  styleUrls: ['./loadmore.component.css'],
})
export class LoadmoreComponent {
  posts: Post[] = [];
  userPosts: Post[] = [];

  showButtons: boolean = true;
  loadMoreClicked: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

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
  }

  sortProductsAToZ() {
    this.userPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortProductsZToA() {
    this.userPosts.sort((a, b) => b.title.localeCompare(a.title));
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
