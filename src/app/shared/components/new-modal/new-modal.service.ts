import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewModalComponent } from './new-modal.component';

@Injectable()
export class NewModalService {
  dialogRef!: MatDialogRef<NewModalComponent>;
  constructor(private _dialog: MatDialog) {}

  public OpenModal(tipo: string) {
    this.dialogRef = this._dialog.open(NewModalComponent, {
      disableClose: true,
      data: tipo,
    });
    return this.dialogRef.afterClosed();
  }
}
