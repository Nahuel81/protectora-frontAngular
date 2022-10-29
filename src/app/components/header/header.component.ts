import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Galeria } from 'src/app/models/galeria.interface';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public galerias : Galeria[] = [];

  constructor(
    private galeriaService:GaleriaService,
    private autenticacionService:AutenticacionService
    ){ }

  ngOnInit(): void {
    this.getGaleria();
  }

  isloged = () => this.autenticacionService.loggedIn();

public getGaleria():void{
this.galeriaService.getGaleria().subscribe({
next: (response : Galeria[])=>{
  this.galerias = response;
},
error : (error: HttpErrorResponse)=>{
 console.log(error);
}
})
}
 
}
