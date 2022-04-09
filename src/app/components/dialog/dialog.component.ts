import {Component, Inject, OnInit} from '@angular/core';
import {Patient} from "../../models/Patient";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  patientForm: FormGroup;
  api;
  today = new Date();
  id: number;

  constructor(_api: ApiService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) {
    this.api = _api
    this.patientForm = new FormGroup({
      firstName: new FormControl("", [Validators.minLength(3)]),
      lastName: new FormControl("", [Validators.minLength(3)]),
      birthDate: new FormControl(""),
      sex: new FormControl(),
      cnp: new FormControl("", [Validators.min(1000000000000), Validators.max(9999999999999)]),
      phoneNumber: new FormControl(),
    })
    this.id = this.api.generateId()
  }

  ngOnInit(): void {
    if (this.editData) {
      this.patientForm.controls["firstName"].setValue(this.editData.firstName)
      this.patientForm.controls["lastName"].setValue(this.editData.lastName)
      this.patientForm.controls["birthDate"].setValue(this.editData.birthDate.split("T")[0])
      this.patientForm.controls["sex"].setValue(this.editData.sex)
      this.patientForm.controls["cnp"].setValue(this.editData.cnp)
      this.patientForm.controls["phoneNumber"].setValue(this.editData.phoneNumber)
    }
  }

  save() {
    if (!this.editData) {
      let patient = new Patient(
        this.id,
        this.patientForm.get("firstName")?.value,
        this.patientForm.get("lastName")?.value,
        this.patientForm.get("birthDate")?.value.toJSON().split("T")[0],
        this.patientForm.get("sex")?.value,
        this.patientForm.get("cnp")?.value,
        this.patientForm.get("phoneNumber")?.value)
      this.api.addPatient(patient)
      this.patientForm.reset()
      this.dialogRef.close("Saved")
    } else this.updatePatient()
  }


  delete() {

  }


  shouldUnlockSaveButton() {
    return this.patientForm.status === "INVALID";
  }

  updatePatient() {
      this.api.update(this.patientForm.value, this.editData.id).subscribe({
        next: () => {
          alert("Patient updated successfully")
          this.patientForm.reset()
          this.dialogRef.close("Patient updated successfully.")
        },
        error: () => {
          alert("Error while updating Patient.")
        }
      })
  }
}


