import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertComponent } from './alert.component';
interface LoaderData {
  titulo?: string;
  texto?: string;
  txtCancelar?: string;
  txtGuardar?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  dialogRef!: MatDialogRef<AlertComponent>;
  constructor(private dialog: MatDialog) {}

  public open(data: LoaderData = {}): Observable<boolean> {
    data.titulo = data.titulo || 'Mensaje de confirmación';
    data.texto = data.texto || '¿Está seguro de guardar los cambios?';
    data.txtCancelar = data.txtCancelar || 'Cancelar';
    data.txtGuardar = data.txtGuardar || 'Guardar';
    this.dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      backdropClass: 'light-backdrop',
    });
    this.dialogRef.componentInstance.titulo = data.titulo;
    this.dialogRef.componentInstance.txtCancelar = data.txtCancelar;
    this.dialogRef.componentInstance.txtGuardar = data.txtGuardar;
    this.dialogRef.componentInstance.texto = data.texto;
    return this.dialogRef.afterClosed();
  }

  public close() {
    if (this.dialogRef) this.dialogRef.close();
  }
}
