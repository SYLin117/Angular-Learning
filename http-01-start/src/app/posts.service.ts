import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content }
    // Send Http request
    console.log(postData);

    // posts.json is firebase requirement, httpClient would automatically transform object to json
    // post() will return a Observable
    // notice that angular would send two request, first one is a Option
    // this.http.post(
    //   'https://ng-learning-299d0-default-rtdb.firebaseio.com/posts.json',
    //   postData
    // )
    // use generic method
    this.http.post<{ name: string }>(
      'https://ng-learning-299d0-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        observe: 'response' // requset full response(default is modey)
      }
    )
      .subscribe(responseData => {
        console.log(responseData)
        console.log(responseData.body)
      }, error => {
        this.error.next(error.message)
      })
  }

  fetchPosts() {
    // you can also use Subject, but it is more suitable when multiple component use it

    // Send Http request
    // this.http.get('https://ng-learning-299d0-default-rtdb.firebaseio.com/posts.json')
    // // you can declare type for the response
    // // check this for object key-value pairs declaration ({[key: string]: Post }) https://www.educba.com/typescript-key-value-pair/
    // .pipe(map((responseData: { [key: string]: Post }) => {
    //   const postsArray: Post[] = [];
    //   for (const key in responseData) {
    //     if (responseData.hasOwnProperty(key)) {
    //       console.log(`key: ${key}`)
    //       postsArray.push({ ...responseData[key], id: key })
    //     }
    //   }
    //   return postsArray
    // }))
    // use generic http.get()
    return this.http.get<{ [key: string]: Post }>(
      'https://ng-learning-299d0-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: new HttpParams().set('print', 'pretty') // set params
      }
    ).pipe(
      map((responseData: { [key: string]: Post }) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            console.log(`key: ${key}`)
            // ...(Rest Parameters)
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray
      }), catchError(errorRes => {
        // throwError would create a Observable
        // console.log(`errorRes: ${JSON.stringify(errorRes)}`)
        return throwError(errorRes)
      })
    )

    // .subscribe((posts: Post[]) => {
    //   console.log(JSON.stringify(posts))
    // })
  }

  deletePosts() {
    // return Observable
    return this.http.delete(
      'https://ng-learning-299d0-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'json' // default: json
      }
    ).pipe(
      // tap allow you to access data without modify it
      tap(event => {
        console.log(`event: ${event}`)
        if (event.type === HttpEventType.Sent){
          // TODO
          // you can use event to get more feature on your UI
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      })
    )
  }


}
