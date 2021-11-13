import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcel } from '../entities/parcel';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }
public getParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>("https://localhost:44320/Parcel");
  }
  
  public getParcelById(id: number): Observable<Parcel> {
    return this.http.get<Parcel>(`https://localhost:44320/Parcel/${id}`);
  }

  public getParcelsByPost(postId: number): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`https://localhost:44320/Parcel/ParcelssbyPost/${postId}`);
  }
  
  public addParcel(parcel: Parcel): Observable<number>{
    return this.http.post<number>("https://localhost:44320/Parcel", parcel);
  }
  
  public deleteParcel(id: number) : Observable<Parcel>{
    return this.http.delete<Parcel>(`https://localhost:44320/Parcel/${id}`);
  }
  
  public updateParcel(parcel: Parcel) : Observable<Parcel>{
    return this.http.put<Parcel>("https://localhost:44320/Parcel", parcel);
  } 
}
