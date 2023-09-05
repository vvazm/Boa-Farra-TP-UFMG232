import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'; // Create this component

@Injectable({
  providedIn: 'root',
})
export class LoadOverlayService {
  private dialogRef: MatDialogRef<unknown, any> | null;

  constructor(private dialog: MatDialog) {
    this.dialogRef = null;
  }

  raise(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(LoadingSpinnerComponent, {
        disableClose: true,
        panelClass: 'custom-overlay-pane',
      });
    }
  }

  abate(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}