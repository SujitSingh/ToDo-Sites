import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userPosts = [];
  fetchError = '';

  constructor(private authSrvc: AuthService, private postsSrvc: PostsService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.fetchError = '';
    this.postsSrvc.getUserPosts().subscribe(
      posts => {
        this.userPosts.length = 0;
        this.userPosts = posts.posts || [];
        if (!this.userPosts.length) {
          this.fetchError = 'No available post';
        }
      },
      error => {
        this.fetchError = error.error && error.error.message || 'Failed to fetch data';
      }
    );
  }

  loadAllPosts() {
    this.fetchError = '';
    this.postsSrvc.getAllUsersPosts().subscribe(
      posts => {
        this.userPosts.length = 0;
        this.userPosts = posts.posts;
      },
      error => {
        this.fetchError = error.error && error.error.message || 'Failed to fetch data';
      }
    );
  }

  deletePost(postId, index) {
    if (postId && index > -1) {
      delete this.userPosts[index].actionMessage;
      this.postsSrvc.deletePost(postId).subscribe(
        deleted => {
          this.userPosts[index].actionMessage = {
            message: 'Item succesfully deleted.',
            type: 'Success'
          }
          setTimeout(() => {
            this.userPosts.splice(index, 1); // remove element after 2 second
          }, 2000);
        },
        error => {
          this.userPosts[index].actionMessage = {
            message: error.error.message || 'Failed to delete',
            type: 'Error'
          }
        }
      );
    }
  }

}
