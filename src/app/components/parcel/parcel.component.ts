import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Parcel } from 'src/app/entities/parcel';
import { Post } from 'src/app/entities/post';
import { ParcelService } from 'src/app/services/parcel.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css']
})
export class ParcelComponent implements OnInit {

  public id: number = 0;
  public fullName: string = "";
  public weight: number = 0;
  public phone: string = "";
  public info: string = "";
  public postId: number = 0;

  public postSelected: number = 0;

  public parcels: Parcel[] = [];
  public posts: Post[] = [];

  public editMode: boolean = false;

  private parcelService: ParcelService;
  private postService: PostService;

  constructor(parcelService: ParcelService, postService: PostService) {
    this.parcelService = parcelService;
    this.postService = postService;
   }

   ngOnInit(): void {
    this.getParcels();
    this.getPosts();
  }
  public getParcels(): void{
    this.parcelService.getParcels().subscribe((parceldFromApi: Parcel[]) => {
      this.parcels = parceldFromApi;
      this.sortParcelsByWeight();
    })
  }
  public getPosts(): void{
     this.postService.getPosts().subscribe((postFromApi: Post[]) => {
       this.posts = postFromApi;
       this.posts.sort((a, b) => a.town.localeCompare(b.town));
     })
  }

  public addParcel() : void{
    var newParcel: Parcel = {
      id: 0,
      fullName: this.fullName,
      weight: this.weight,
      phone: this.phone,
      info: this.info,
      postId: this.postId
    }
    this.parcelService.addParcel(newParcel).subscribe((id:number) => {
      newParcel.id = id;
      newParcel.post = this.posts.filter(m => m.id === newParcel.postId)[0];
      this.parcels.push(newParcel);
      this.sortParcelsByWeight();
    }); 
  } 

  public onPostSelected(selectedPostId: number): void{
    if(selectedPostId == 0){
      this.getParcels();
    }
    else{
      this.parcelService.getParcelsByPost(selectedPostId).subscribe((parcelsFromApi) => {
        this.parcels = parcelsFromApi; 
    })
  }
  }

  public deleteParcel(id: number) : void{
    console.log(id);
        this.parcelService.deleteParcel(id).subscribe(() =>{
          this.parcels = this.parcels.filter(p => p.id != id)
        });
    }

  public updateParcel(parcel: Parcel) : void{

    this.editMode = true;

    this.id = parcel.id;
    this.fullName = parcel.fullName;
    this.weight = parcel.weight;
    this.phone = parcel.phone;
    this.info = parcel.info,
    this.postId = parcel.postId;
    console.log(this.postId);
    console.log(this.fullName);
    };
    
      sendUpdatedParcel(){
        var updatedParcel: Parcel = {
          id: this.id,
          fullName: this.fullName,
          weight: this.weight,
          phone: this.phone,
          info: this.info,
          postId: this.postId
        }
          this.parcelService.updateParcel(updatedParcel).subscribe(() => {
            updatedParcel.post = this.posts.filter(h => h.id === updatedParcel.postId)[0];
              let index = this.parcels.map(p => p.id).indexOf(this.id);
               this.parcels[index] = updatedParcel;
               this.sortParcelsByWeight();
            }); 
            this.editMode = false;
      }

private sortParcelsByWeight(){
  this.parcels.sort((a, b) => (a.weight < b.weight) ? 1 : -1);
}
}
