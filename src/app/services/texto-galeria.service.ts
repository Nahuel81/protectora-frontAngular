import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { quienesSomos } from '../models/textoGaleria';

@Injectable({
  providedIn: 'root'
})
export class TextoGaleriaService {

  constructor(private http: HttpClient) { }
private URL = "http://localhost:8080"

public getQuienesSomos():Observable<quienesSomos[]>{
return this.http.get<quienesSomos[]>(`${this.URL}/api/quienesSomos`);
}
 public addQuienesSomos(quienes:quienesSomos):Observable<quienesSomos>{
  return this.http.post<quienesSomos>(`${this.URL}/api/quienesSomos`,quienes);
 }

  public updateQuienesSomos(quienes:quienesSomos):Observable<quienesSomos>{
    return this.http.put<quienesSomos>(`${this.URL}/api/quienesSomos`,quienes);
  }

  public deleteQuienesSomos(idGaleria:number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/api/quienesSomos/${idGaleria}`); 
   }

}
