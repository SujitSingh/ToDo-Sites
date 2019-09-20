import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

interface Post {
  _id: string;
  author: string;
  message: string;
  complete: Boolean;
  addedDate: Date;
};

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId: String;
  originalPost: Post;
  postObj = <Post>{};
  pageErrorMsg: String;
  pageSuccessMsg: String;

  constructor(private route: ActivatedRoute, public postSrvc: PostsService, private router: Router) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');
    if (this.route.snapshot.url[0].path === 'edit' && this.postId) {
      // for "edit" post route
      this.getPost(this.postId);
    } else {
      // for "add" post route
      this.postObj.complete = false;
    }
  }

  getPost(postId: String) {
    this.postSrvc.getPost(postId).subscribe(
      fetchedPost => {
        if (fetchedPost.post) {
          this.originalPost = fetchedPost.post;
          this.postObj = Object.assign({}, fetchedPost.post);
        } else {
          this.pageErrorMsg = 'Post is not available';
        }
      },
      error => {
        this.pageErrorMsg = error.error.message || 'Failed to get post details';
      }
    );
  }

  addPost(postObj: Post) {
    this.resetPageMessages();
    const message = postObj.message && postObj.message.trim();
    if (message) {
      const newPostObj = {
        message: message, 
        complete: postObj.complete
      }
      this.postSrvc.addPost(newPostObj).subscribe(
        addedPost => {
          this.pageSuccessMsg = 'Post added successfully';
          this.navigateToEdit(addedPost.post._id);
        },
        error => {
          this.pageErrorMsg = error.error.message || 'Failed to add new post';
        }
      );
    } else {
      this.pageErrorMsg = 'Todo message is required';
    }
  }
  
  updatePost(postObj: Post) {
    this.resetPageMessages();
    const message = postObj.message && postObj.message.trim();
    if (message) {
      const updatedPostObj = {
        id: postObj._id,
        message: message, 
        complete: postObj.complete
      }
      this.postSrvc.updatePost(updatedPostObj).subscribe(
        updatedPost => {
          this.originalPost = updatedPost.post;
          this.postObj = Object.assign({}, updatedPost.post);
          this.pageSuccessMsg = 'Post updated successfully';
        },
        error => {
          this.pageErrorMsg = error.error.message || 'Failed to update post';
        }
      )
    } else {
      this.pageErrorMsg = 'Todo message is required';
    }
  }

  navigateToEdit(postId) {
    this.router.navigate(['/edit', postId]);
  }

  resetPostChanges() {
    this.resetPageMessages();
    this.postObj = Object.assign({}, this.originalPost);
  }

  resetPageMessages() {
    this.pageErrorMsg = '';
    this.pageSuccessMsg = '';
  }

}
