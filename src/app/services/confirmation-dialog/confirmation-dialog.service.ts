import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../components/confirmation/confirmation.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmationDialog() {
    return this.dialog.open(ConfirmationComponent, {
      width: "390px",
      disableClose: true,
      panelClass: "confirm-dialog-container"
    })
  }
}
