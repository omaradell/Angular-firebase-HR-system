import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { Observable } from 'rxjs'

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = {
    emp_job: '',
    dep_name: '',
    job_off: '',
    emp_name: '',
    emp_address: '',
    emp_birth: '',
    emp_militry: '',
    emp_start: '',
    emp_edu: '',
    documents: '',
    image: '',
    email: '',
    emp_phone: '',
  }
  userKey: any;
  title = 'PMHR';
  user: Observable<firebase.User>;
  private isLoggedIn: Boolean = false;
  private email: string;
  myUid: any;
  myRole: any;

  itemArray = [];
  itemList: AngularFireList<any>;
  constructor(public auth: AngularFireAuth, public route: Router, public db: AngularFireDatabase) {
    this.myUid = localStorage.getItem('uid');
    this.myRole = localStorage.getItem('role');


    let status = localStorage.getItem('isLoggedIn')
    if (status === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this.itemList = db.list('employees')
    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        if (item.payload.child('uid').val() === this.myUid) {
          this.userKey = item.key;
          this.itemArray.push(x as employeesListData)
          this.data.emp_name = this.itemArray[0]['emp_name'];
          // this.data.dep_name = this.itemArray[0]['dep_name'];
          // this.data.emp_job = this.itemArray[0]['emp_job'];
          // this.data.job_off = this.itemArray[0]['job_off'];
          // this.data.email = this.itemArray[0]['email'];
          this.data.image = this.itemArray[0]['image'];
          // this.data.documents = this.itemArray[0]['documents'];
          // this.data.emp_edu = this.itemArray[0]['emp_edu'];
          // this.data.emp_start = this.itemArray[0]['emp_start'];
          // this.data.emp_militry = this.itemArray[0]['emp_militry'];
          // this.data.emp_birth = this.itemArray[0]['emp_birth'];
          // this.data.emp_address = this.itemArray[0]['emp_address'];
          // this.data.emp_phone = this.itemArray[0]['emp_phone'];
          console.log(this.itemArray);
        }

      })
    })

  }


  logOut() {
    this.auth.auth.signOut();
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false')
    this.route.navigate(['/login']);
    localStorage.clear();

  }


}

export class employeesListData {
  $key: string;
  emp_job: string;
  dep_name: string;
  job_off: string;
  emp_name: string;
  emp_address: string;
  emp_birth: string;
  emp_militry: string;
  emp_start: string;
  emp_edu: string;
  documents: string;
  image: string;
  email: string;
  emp_phone: string;
  role: string;
}