import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from './loading-spinner.component'; // Create this component
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private dialogRef: MatDialogRef<unknown, any> | null;

  private pendingCount: BehaviorSubject<number>;

  constructor(private dialog: MatDialog) {
    this.dialogRef = null;
    this.pendingCount = new BehaviorSubject<number>(0);

    this.pendingCount.subscribe((count) => {  
      if (count > 0) {
        this.raise();
      } else {
        this.abate();
      }
    });
  }

  addPending() {
    this.pendingCount.next(this.pendingCount.getValue() + 1);
  }

  removePending() {
    this.pendingCount.next(this.pendingCount.getValue() - 1);
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