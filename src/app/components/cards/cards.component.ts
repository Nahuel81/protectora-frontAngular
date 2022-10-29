import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { iBusqueda } from 'src/app/models/busqueda.interface';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
 
  public busquedas: iBusqueda[] = [];
  public editBusqueda: iBusqueda|undefined;
  public deleteBusqueda: iBusqueda|undefined;

  constructor(
    private busquedaService:BusquedaService,
    public autenticacionService: AutenticacionService
    ) { }

  ngOnInit(): void {
    this.getBusqueda();
  }

  isloged = () => this.autenticacionService.loggedIn();

  public getBusqueda(): void {
    this.busquedaService.getBusqueda().subscribe({
      next: (response: iBusqueda[]) => {
        this.busquedas = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public onOpenModal(mode: string, busqueda?: iBusqueda): void {
    const container = document.getElementById('addBusquedaModal');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addBusquedaModal');
    } else if (mode === 'delete') {
      this.deleteBusqueda = busqueda;
      button.setAttribute('data-bs-target', '#deleteBusquedaModal');
    } else if (mode === 'edit') {
      this.editBusqueda = busqueda;
      button.setAttribute('data-bs-target', '#editBusquedaModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddBusqueda(addForm: NgForm): void {
    document.getElementById('add-busqueda-form')?.click();
    this.busquedaService.addBusqueda(addForm.value).subscribe({
      next: (response: iBusqueda) => {
       /*  console.log(response); */
        this.getBusqueda();
        addForm.reset();
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

public onUpdateBusqueda(busqueda:iBusqueda){
  this.editBusqueda=busqueda;
  document.getElementById('edit-busqueda-form')?.click();
  this.busquedaService.updateBusqueda(busqueda).subscribe({
    next: (response:iBusqueda)=>{
     /*  console.log(response); */
      this.getBusqueda();
    },error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}

public onDeleteBusqueda(idBusqueda: number): void {
  this.busquedaService.deleteBusqueda(idBusqueda).subscribe({
    next: (response: void) => {
     /*  console.log(response); */
      this.getBusqueda();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
  });
} 


}
