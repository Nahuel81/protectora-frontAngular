import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { quienesSomos } from 'src/app/models/textoGaleria';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TextoGaleriaService } from 'src/app/services/texto-galeria.service';

@Component({
  selector: 'app-textogaleria',
  templateUrl: './textogaleria.component.html',
  styleUrls: ['./textogaleria.component.css']
})
export class TextogaleriaComponent implements OnInit {

  public texto : quienesSomos[] = []
  public editQuienesSomos: quienesSomos|undefined;
  public deleteQuienesSomos: quienesSomos|undefined;
  

  constructor(
    private textoGaleria: TextoGaleriaService,
    public autenticacionService: AutenticacionService
    ) { }

  ngOnInit(): void {
    this.getQuienesSomos();
  }

  isloged = () => this.autenticacionService.loggedIn();
  
  public getQuienesSomos(): void {
    this.textoGaleria.getQuienesSomos().subscribe({
      next: (response: quienesSomos[]) => {
        this.texto = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

//modales

public onOpenModal(mode: string, texto?: quienesSomos): void {
  const container = document.getElementById('addQuienesSomosModal');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-bs-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-bs-target', '#addQuienesSomosModal');
  } else if (mode === 'delete') {
    this.deleteQuienesSomos = texto;
    button.setAttribute('data-bs-target', '#deleteQuienesSomosModal');
  } 
  else if (mode === 'edit') {
    this.editQuienesSomos = texto;
    button.setAttribute('data-bs-target', '#editQuienesSomosModal');
  }

  container?.appendChild(button);
  button.click();
}

public onAddQuienesSomos(addForm: NgForm): void {
  document.getElementById('add-somos-form')?.click();
  this.textoGaleria.addQuienesSomos(addForm.value).subscribe({
    next: (response: quienesSomos) => {
     /*  console.log(response); */
      this.getQuienesSomos();
      addForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    },
  });
}

public onUpdateQuienesSomos(texto: quienesSomos): void {
  this.editQuienesSomos = texto;
  this.textoGaleria.updateQuienesSomos(texto).subscribe({
    next: (response: quienesSomos) => {
     /*  console.log(response) */
      this.getQuienesSomos();
    },
    error: (error: HttpErrorResponse) => {
      console.log('error');
    },
  });
}

public onDeleteQuienesSomos(idBusqueda: number): void {
  this.textoGaleria.deleteQuienesSomos(idBusqueda).subscribe({
    next: (response: void) => {
     /*  console.log(response); */
      this.getQuienesSomos();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
} 





  }
