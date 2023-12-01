import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPostDetails();
  }

  getPostDetails(): void {
    this.route.params.subscribe((params) => {
      const postId = params['id'];
      if (postId) {
        this.postService.getPostById(postId).subscribe((response) => {
          if (
            response &&
            response.data &&
            response.data.posts.length > 0
          ) {
            this.post = response.data.posts[0]; 
          } else {
            console.error(
              'No post found or invalid API response format:',
              response
            );
          }
        });
      }
    });
  }
}
