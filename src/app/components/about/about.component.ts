import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { iAdopcion } from 'src/app/models/adopcion.interface';
import { AdopcionService } from 'src/app/services/adopcion.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public adopciones: iAdopcion[] = [];
  public editAdopcion: iAdopcion|undefined;
  public deleteAdopcion: iAdopcion|undefined;

  constructor(
    private adopcionService:AdopcionService,
    public autenticacionService: AutenticacionService
    ) { }

  ngOnInit(): void {
    this.getAdopciones();
  }

  isloged = () => this.autenticacionService.loggedIn();

  public getAdopciones(): void {
    this.adopcionService.getAdopciones().subscribe({
      next: (response: iAdopcion[]) => {
        this.adopciones = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode: string, adopcion?: iAdopcion): void {
    const container = document.getElementById('addAdopcionModal');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addAdopcionModal');
    } else if (mode === 'delete') {
      this.deleteAdopcion = adopcion;
      button.setAttribute('data-bs-target', '#deleteAdopcionModal');
    } else if (mode === 'edit') {
      this.editAdopcion = adopcion;
      button.setAttribute('data-bs-target', '#editAdopcionModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddAdopcion(addForm: NgForm): void {
    document.getElementById('add-adopcion-form')?.click();
    this.adopcionService.addAdopcion(addForm.value).subscribe({
      next: (response: iAdopcion) => {
       /*  console.log(response); */
        this.getAdopciones();
        addForm.reset();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

public onUpdateAdopcion(adopcion:iAdopcion){
  this.editAdopcion=adopcion;
  document.getElementById('edit-adopcion-form')?.click();
  this.adopcionService.updateAdopcion(adopcion).subscribe({
    next: (response:iAdopcion)=>{
     /*  console.log(response); */
      this.getAdopciones();
    },error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}

public onDeleteAdopcion(idAdopcion: number): void {
  this.adopcionService.deleteAdopcion(idAdopcion).subscribe({
    next: (response: void) => {
     /*  console.log(response); */
      this.getAdopciones();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
} 



}
