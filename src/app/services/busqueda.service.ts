import { Injectable } from '@angular/core';
import  {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iBusqueda } from '../models/busqueda.interface';


@Injectable({
  providedIn: 'root'
})
export class BusquedaService {


  constructor(private http:HttpClient) { }
  private URL = 'http://localhost:8080';
  
  public getBusqueda():Observable<iBusqueda[]>{
    return this.http.get<iBusqueda[]>(`${this.URL}/api/busqueda`);
  }
  public addBusqueda(busqueda: iBusqueda):Observable<iBusqueda>{
    return this.http.post<iBusqueda>(`${this.URL}/api/busqueda`,busqueda);
  }
  public updateBusqueda(busqueda: iBusqueda):Observable<iBusqueda>{
    return this.http.put<iBusqueda>(`${this.URL}/api/busqueda`,busqueda);
  }
  public deleteBusqueda(busquedaId: number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/api/busqueda/${busquedaId}`);
  } 
}
