import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../entities/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }
   public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("https://localhost:44320/Post");
  }
  
  public getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`https://localhost:44320/Post/${id}`);
  }
  
  public addPost(post: Post): Observable<number>{
    return this.http.post<number>("https://localhost:44320/Post", post);
  }
  
  public deletePost(id: number) : Observable<Post>{
    return this.http.delete<Post>(`https://localhost:44320/Post/${id}`);
  }
  
  public updatePost(post: Post) : Observable<Post>{
    return this.http.put<Post>("https://localhost:44320/Post", post);
  } 
}
