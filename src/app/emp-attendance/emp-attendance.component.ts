import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AttendanceService } from '../services/attendance.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-emp-attendance',
  templateUrl: './emp-attendance.component.html',
  styleUrls: ['./emp-attendance.component.css']
})
export class EmpAttendanceComponent implements OnInit {
  itemArray = [];
  itemList: AngularFireList<any>;
  empArray = [];
  empList: AngularFireList<any>;
  data = {
    uid: '',
    from: '',
    to: '',
    date: '',
  }

  isSubmitted: boolean;


  formTemplate = new FormGroup({
    uid: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    att_date: new FormControl('', Validators.required),
  })



  constructor(public db: AngularFireDatabase, private service: AttendanceService) {
    this.empList = db.list('employees');

    this.empList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.empArray.push(x as employeesListData)
        console.log(this.empArray)
      })
    })

  }
  time = '13:30:00';
  meridian = true;


  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  ngOnInit() {
    this.service.getAttList();
  }

  addAtt(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      this.service.addEmpAtt(formValue);
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
      uid: '',
      from: '',
      to: '',
      att_date: ''
    });
    this.isSubmitted = false;
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
  uid: string;
}
export class attendanceListData {
  $key: string;
  uid: string;
  from: string;
  to: string;
  att_date: string;
}