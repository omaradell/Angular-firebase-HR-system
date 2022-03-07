import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {
  data = {
    office_name: '',
    office_location: '',
    office_type: '',
    office_desc: '',
    office_dep:''
  }
  isSubmitted: boolean;


  formTemplate = new FormGroup({
    office_name: new FormControl('', Validators.required),
    office_location: new FormControl('', Validators.required),
    office_type: new FormControl('', Validators.required),
    office_desc: new FormControl('', Validators.required),
    office_dep: new FormControl('', Validators.required),
  })

  itemArray = [];
  depArray = [];

  itemList: AngularFireList<any>;
  depList: AngularFireList<any>;

  myUid: string;

  constructor(public db: AngularFireDatabase, public route: Router) {
    this.depList = db.list('departments');
    this.itemList = db.list('offices');

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.itemArray.push(x as officesListData)
      })
    })
    console.log(this.itemArray);
    this.depList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.depArray.push(x as departmentsListData)
      })
    })
    this.myUid = localStorage.getItem('uid');
console.log(this.depArray);
  }

  ngOnInit() {
  }

  addOffice(formValue) {
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
      office_name: '',
      office_location: '',
      office_type: '',
      office_desc: '',
      office_dep:''
    });
    this.isSubmitted = false;
  }

  onDelete($key) {
    this.itemList.remove($key);
    this.itemArray = [];
  }

  details(key){
    this.route.navigate(['off-details/'+ key])
  }

}
export class departmentsListData {
  $key: string;
  dep_name: string;
  dep_desc: string;
  dep_location: string;
  dep_type: string;
}

export class officesListData {
  $key: string;
  office_name: string;
  office_desc: string;
  office_location: string;
  office_type: string;
  office_dep:string;
}
