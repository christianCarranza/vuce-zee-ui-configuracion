import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface dataModal {
  rol: datosObject;
}
export interface datosObject {
  titulo: string;
  rutasave: string;
  titulorpta: string;
  nameField: string;
}
@Component({
  selector: 'lotes-new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.scss'],
})
export class NewModalComponent implements OnInit {
  tipo: dataModal = {
    rol: {
      titulo: 'Nuevo Rol',
      rutasave: '/roles',
      titulorpta: 'El rol',
      nameField: 'rol',
    }
  };
  public formRegistro!: FormGroup;
  titulo: string = '';
  constructor(
    public _dialogRef: MatDialogRef<NewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.titulo = this.tipo[this.data as keyof dataModal].titulo;
    this.initForm();
  }

  initForm(): void {
    this.formRegistro = this._fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });
  }
  get nombre() {
    return this.formRegistro.get('nombre');
  }
  get descripcion() {
    return this.formRegistro.get('descripcion');
  }

  saveInfoTerreno() {
    
  }

 

  closeModal(value: object) {
    this._snackBar.open(
      `Agregado correctamente ${
        this.tipo[this.data as keyof dataModal].titulorpta
      }`
    );
    this._dialogRef.close(value);
  }
}
