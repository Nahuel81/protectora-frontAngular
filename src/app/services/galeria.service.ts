import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Galeria } from '../models/galeria.interface';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private http:HttpClient) {}
  private URL= "http://localhost:8080"

  public getGaleria():Observable<Galeria[]>{
    return this.http.get<Galeria[]>(`${this.URL}/api/galeria`);
  }

public addGaleria(galeria:Galeria):Observable<Galeria>{
  return this.http.post<Galeria>(`${this.URL}/api/galeria`,galeria);
}
public updateGaleria(galeria:Galeria):Observable<Galeria>{
  return this.http.put<Galeria>(`${this.URL}/api/galeria`,galeria);
}

public deleteGaleria(idGaleria:number):Observable<void>{
 return this.http.delete<void>(`${this.URL}/api/galeria/${idGaleria}`); 
}

}
