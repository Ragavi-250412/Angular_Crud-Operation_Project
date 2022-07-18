import { Directionality } from '@angular/cdk/bidi';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarConfigService {
  setAutoHide = true;
  autoHide = 1000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
  ) { }

  messageConfig(): any {
    const config = {
    verticalPosition : "top",
   horizontalPosition : "center",
   duration : 1000
    }
    return config;
  }

}


