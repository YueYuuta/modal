import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export class UsuarioModel {
  usuario: string;
  contrasena: string;
}

@Component({
  selector: 'app-modal-dinamico',
  templateUrl: './modal-dinamico.component.html',
  styleUrls: ['./modal-dinamico.component.css'],
})
export class ModalDinamicoComponent implements OnInit {
  titulo: string;
  usuario: UsuarioModel;
  Form: FormGroup;
  constructor(
    public readonly modalRef: BsModalRef,
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.intanciaForm();
  }

  private intanciaForm(): void {
    if (!this.usuario) {
      this.formulario();
    } else {
      this.formularioEditar();
    }
  }
  cancelar(): void {
    this.modalRef.hide();
    this.modalService.setDismissReason('cancelar');
  }

  guardar(event): void {
    const usuario = this.Form.value;
    this.modalRef.hide();
    this.modalService.setDismissReason(usuario);
    this.Form.reset();
  }

  private formulario(): void {
    this.Form = this.fb.group({
      usuario: [null, Validators.required],
      contrasena: [null, Validators.required],
    });
  }

  private formularioEditar(): void {
    this.Form = this.fb.group({
      usuario: [this.usuario.usuario, Validators.required],
      contrasena: [this.usuario.contrasena, Validators.required],
    });
  }
}
