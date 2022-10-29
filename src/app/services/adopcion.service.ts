import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iAdopcion } from '../models/adopcion.interface';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  
  constructor(private http:HttpClient) { }
  private URL = 'http://localhost:8080';
 
  public getAdopciones():Observable<iAdopcion[]>{
    return this.http.get<iAdopcion[]>(`${this.URL}/api/adopcion`);
  }
  public addAdopcion(adopcion: iAdopcion):Observable<iAdopcion>{
    return this.http.post<iAdopcion>(`${this.URL}/api/adopcion`,adopcion);
  }
  public updateAdopcion(adopcion: iAdopcion):Observable<iAdopcion>{
    return this.http.put<iAdopcion>(`${this.URL}/api/adopcion`,adopcion);
  }
  public deleteAdopcion(adopcionId: number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/api/adopcion/${adopcionId}`);
  } 

}
