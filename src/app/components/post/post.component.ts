import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public id: number = 0;
  public town: string = "";
  public code: string = "";
  public capacity: number = 0;

  public posts: Post[] = [];

  public editMode: boolean = false;

  private postService: PostService;

  constructor(postService: PostService) { 
    this.postService = postService;
  }

  ngOnInit(): void { this.postService.getPosts().subscribe((postsFromApi) => {
    this.posts = postsFromApi;
    this.sortPostsByCode();
})
}

public addPost() :void{
  var newPost: Post = {
    id: 0,
    town: this.town,
    code: this.code,
    capacity: this.capacity
  }
  this.postService.addPost(newPost).subscribe((id:number) => {
    newPost.id = id;
    this.posts.push(newPost);
    this.sortPostsByCode()
  });
}

public deletePost(id: number) : void{
  console.log(id);
      this.postService.deletePost(id).subscribe(() =>{
        this.posts = this.posts.filter(p => p.id != id)
      });
  }

  public updatePost(horse: Post) : void{

    this.editMode = true;
    
    this.id = horse.id;
    this.town = horse.town,
    this.code = horse.code,
    this.capacity = horse.capacity
    };

    sendUpdatedPost(){
      var updatedPost: Post = {
        id: this.id,
        town: this.town,
        code: this.code,
        capacity: this.capacity,
      }
      this.postService.updatePost(updatedPost).subscribe(() => {
          let index = this.posts.map(h => h.id).indexOf(this.id);
           this.posts[index] = updatedPost;
           this.sortPostsByCode();
        }); 
        this.editMode = false;
  }

  private sortPostsByCode(){
    this.posts.sort((a, b) => a.code.localeCompare(b.code))
  }
}
