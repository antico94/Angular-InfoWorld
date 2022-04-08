import {Component, OnInit} from '@angular/core';
import {Patient} from "../../models/Patient";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientsService} from "../../services/patients.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  patientForm: FormGroup;
  patientService;
  today = new Date();
  orderNumber: number;

  constructor(PatientService: PatientsService) {
    this.patientService = PatientService;
    this.patientForm = new FormGroup({
      firstName: new FormControl("", [Validators.minLength(3)]),
      lastName: new FormControl("", [Validators.minLength(3)]),
      dateOfBirth: new FormControl(""),
      sex: new FormControl(),
      cnp: new FormControl("", [Validators.min(1000000000000), Validators.max(9999999999999)]),
      phoneNumber: new FormControl(),
    })
    this.orderNumber = this.patientService.generateOrderNumber();
  }

  ngOnInit(): void {
  }

  save() {
    let patient = new Patient(
      this.orderNumber,
      this.patientForm.get("firstName")?.value,
      this.patientForm.get("lastName")?.value,
      this.patientForm.get("dateOfBirth")?.value.toJSON().split("T")[0],
      this.patientForm.get("sex")?.value,
      this.patientForm.get("cnp")?.value,
      this.patientForm.get("phoneNumber")?.value
    )
    this.patientService.addPatient(patient)

  }


  shouldUnlockSaveButton() {
    return this.patientForm.status === "INVALID";
  }
}
