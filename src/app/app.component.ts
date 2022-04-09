import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "./components/dialog/dialog.component";
import {ApiService} from "./services/api/api.service";
import {ConfirmationDialogService} from "./services/confirmation-dialog/confirmation-dialog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  api;
  data;
  confirmationService


  constructor(_api: ApiService, private dialog: MatDialog, private _confirmationService: ConfirmationDialogService) {
    this.api = _api
    this.data = this.api.getPatients();
    this.confirmationService = _confirmationService
  }

  displayedColumns: string[] = ['name', 'lastName', 'birthDate', 'sex', 'actions'];

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(value => {
      if (value === "Saved") {
        this.data = this.api.getPatients()
      }
    });
  }


  edit(row: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe({
      next: value => {
        console.log(value)
        if (value === "Patient updated successfully.") {
          this.data = this.api.getPatients()
        }
      }
    })
  }

  deletePatient(id: number) {
    this.confirmationService.openConfirmationDialog().afterClosed().subscribe(res => {
      if (res === true) {
        this.api.deletePatient(id).subscribe({
          next: (res) => {
            this.data = this.api.getPatients()
          },
          error: () => {
            alert("Error while deleting the Patient.")
          }
        })
      }
    })
  }
}
