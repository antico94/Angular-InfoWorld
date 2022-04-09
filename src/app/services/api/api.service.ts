import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient} from "../../models/Patient";
import {DialogComponent} from "../../components/dialog/dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  generatedId = this.generateId();
  constructor(private http: HttpClient) {
  }

   generateId() : number {
    let result = 0;
    this.getPatients().subscribe(value => {
      result = value[value.length-1].id + 1
    });
    return  result;
  }

  addPatient(patient: Patient){
    this.http.post<any>("http://localhost:3000/patients", patient)
      .subscribe({
        next: (res) => {
          alert("Patient added successfully.")
        },
        error: err => {
          console.log(err)
        }
      })

  }

  getPatients() {
    return this.http.get<Patient[]>("http://localhost:3000/patients")
  }
}
