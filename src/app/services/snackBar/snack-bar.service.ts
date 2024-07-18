import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  customClassSnackBar = {
    success: 'custom-snackbar-success',
    error: 'custom-snackbar-error',
    warning: 'custom-snackbar-warning'
  }

  openSnackBar(
      message: string,
      action: string,
      messageType: 'success' | 'error' | 'warning',
      duration = 5000
  ) {
    const panelClass = this.customClassSnackBar[messageType]

    this.snackBar.open(message, action, {
      duration,
      announcementMessage: message,
      data: { message, action, duration, type: messageType },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: panelClass,
    });
  }

  openSnackBarFixed(
      message: string,
      action: string,
      messageType: 'success' | 'error' | 'warning',
  ) {
    const panelClass = this.customClassSnackBar[messageType]

    this.snackBar.open(message, action, {
      announcementMessage: message,
      data: { message, action, type: messageType },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: panelClass,
    });
  }

  openSnackBarFixedNoAction(
      message: string,
      duration = 5000,
      messageType: 'success' | 'error' | 'warning',
  ) {
    const panelClass = this.customClassSnackBar[messageType]

    this.snackBar.open(message, '', {
      duration,
      announcementMessage: message,
      data: { message, type: messageType },
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: panelClass,
    });
  }

  
}
