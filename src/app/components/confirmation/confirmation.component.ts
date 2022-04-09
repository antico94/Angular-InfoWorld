import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  dialogRef;

  constructor(_dialogRef: MatDialogRef<ConfirmationComponent>) {
    this.dialogRef = _dialogRef
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(false)
  }

}
