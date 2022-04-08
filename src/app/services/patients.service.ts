import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient} from "../models/Patient";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  orderNumberGenerator = 0;

  constructor() {}

    generateOrderNumber(){
    this.orderNumberGenerator+=1;
    return this.orderNumberGenerator
}


  addPatient(patient: Patient){

  }


}
