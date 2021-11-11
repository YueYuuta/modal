import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  ModalDinamicoComponent,
  UsuarioModel,
} from './modal-dinamico/modal-dinamico.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  modalRef?: BsModalRef;
  title = 'modal';
  constructor(private modalService: BsModalService) {}
  usuario: UsuarioModel = {
    contrasena: '1234',
    usuario: 'jose@jose.com',
  };

  openModal(titulo: string, usuario?: UsuarioModel): void {
    this.modalRef = this.modalService.show(ModalDinamicoComponent, {
      initialState: { titulo, usuario },
      // backdrop: 'static',
    });
    this.modalRef.onHidden.subscribe((data) => {
      console.log('dato de regreso', data);
      if (data !== 'cancelar') {
        this.usuario = data;
      }
    });
  }
}
