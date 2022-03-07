import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  attList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getAttList() {
    this.attList = this.firebase.list('attendance');
  }

  addEmpAtt(EmpAtt) {
    this.attList.push(EmpAtt);
  }

}
