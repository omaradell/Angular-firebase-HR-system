import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  data = {
    dep_name: '',
    dep_location: '',
    dep_type: '',
    dep_desc: ''
  }
 
  isSubmitted: boolean;


  formTemplate = new FormGroup({
    dep_name: new FormControl('', Validators.required),
    dep_location: new FormControl('', Validators.required),
    dep_type: new FormControl('', Validators.required),
    dep_desc: new FormControl('', Validators.required)
  })

  itemArray = [];
  itemList: AngularFireList<any>;
 
  myUid: string;

  constructor(public db: AngularFireDatabase, public route: Router, private fire: AngularFireAuth) {
    this.itemList = db.list('departments');

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.itemArray.push(x as departmentsListData)
      })
    })
    console.log(this.itemArray);
    this.myUid = localStorage.getItem('uid');



  }

  ngOnInit() {
  }

  addDep(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      this.itemList.push(formValue);
      this.itemArray = [];
      // this.resetForm();
      // this.route.navigate(['/departments'])
    }
    // console.log(formValue);
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      depName: '',
      depLocation: '',
      depType: '',
      depDes: '',
    });
    this.isSubmitted = false;
  }

  onDelete($key) {
    this.itemList.remove($key);
    this.itemArray = [];
  }

  details(key) {
    this.route.navigate(['dep-details/' + key])
  }

}

export class departmentsListData {
  $key: string;
  dep_name: string;
  dep_desc: string;
  dep_location: string;
  dep_type: string;
}

