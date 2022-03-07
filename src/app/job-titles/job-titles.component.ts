import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrls: ['./job-titles.component.css']
})
export class JobTitlesComponent implements OnInit {
  data = {
    job_name: '',
    job_desc: '',
    min_sallary: '',
    max_sallary: '',
    job_off: '',
    job_dep: ''
  }

  isSubmitted: boolean;


  formTemplate = new FormGroup({
    job_name: new FormControl('', Validators.required),
    job_desc: new FormControl('', Validators.required),
    min_sallary: new FormControl('', Validators.required),
    max_sallary: new FormControl('', Validators.required),
    job_off: new FormControl('', Validators.required),
    job_dep: new FormControl('', Validators.required),
  })

  itemArray = [];
  depArray = [];
  offArray = [];

  itemList: AngularFireList<any>;
  depList: AngularFireList<any>;
  offList: AngularFireList<any>;

  myUid: string;

  constructor(public db: AngularFireDatabase, public route: Router) {
    this.depList = db.list('departments');
    this.offList = db.list('offices');
    this.itemList = db.list('jobs');


    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.itemArray.push(x as jobTitlesListData)
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
    this.offList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.offArray.push(x as officesListData)
      })
    })
    this.myUid = localStorage.getItem('uid');
    console.log(this.depArray);
  }

  ngOnInit() {
  }

  addJob(formValue) {
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
      job_name: '',
      job_desc: '',
      min_sallary: '',
      max_sallary: '',
      job_off: '',
      job_dep: ''
    });
    this.isSubmitted = false;
  }

  onDelete($key) {
    this.itemList.remove($key);
    this.itemArray = [];
  }

  details(key) {
    this.route.navigate(['job-details/' + key])
  }

}
export class jobTitlesListData {
  $key: string;
  job_name: string;
  job_desc: string;
  min_sallary: string;
  max_sallary: string;
  job_off: string;
  job_dep: string;
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
  office_dep: string;
}
