import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false
  error = null
  // different pattern of handleing error (use to handle post error)
  private errorSub: Subscription

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMsg => {
      this.error = errorMsg
    })

    this.onFetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {

    this.isFetching = true
    this.postsService.fetchPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts
        this.isFetching = false
      },
      error => {
        console.log(error)
        this.error = error.message
      }
    )
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    });
  }

  onHandleError() {
    this.error = null
    this.isFetching = false
  }

  ngOnDestroy(): void {
    if (this.errorSub) {
      this.errorSub.unsubscribe()
    }

  }

}
