import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  data = {
    emp_job: '',
    dep_name: '',
    emp_name: '',
    emp_phone: '',
    emp_address: '',
    emp_birth: '',
    emp_militry: '',
    emp_start: '',
    emp_edu: '',
    documents: '',
    image: '',
    email: '',
    role: '',
    job_off: '',
    pw: 'hrmspw'
  }

  isSubmitted: boolean;


  // formTemplate = new FormGroup({
  //   emp_job: new FormControl('', Validators.required),
  //   dep_name: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   role: new FormControl('', Validators.required),
  //   emp_name: new FormControl('', Validators.required),
  //   emp_address: new FormControl('', Validators.required),
  //   emp_birth: new FormControl('', Validators.required),
  //   emp_phone: new FormControl('', Validators.required),
  //   dep_location: new FormControl('', Validators.required),
  //   emp_militry: new FormControl('', Validators.required),
  //   emp_start: new FormControl('', Validators.required),
  //   emp_edu: new FormControl('', Validators.required),
  //   documents: new FormControl('', Validators.required),
  //   image: new FormControl('', Validators.required)
  // })

  itemArray = [];
  itemList: AngularFireList<any>;
  depArray = [];
  depList: AngularFireList<any>;
  offArray = [];
  offList: AngularFireList<any>;
  jobArray = [];
  jobList: AngularFireList<any>;
  userArray = [];
  userList: AngularFireList<any>;

  myUid: string;

  constructor(public db: AngularFireDatabase, public route: Router, private fire: AngularFireAuth) {
    this.itemList = db.list('employees');
    this.userList = db.list('users')

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.itemArray.push(x as employeesListData)
      })
    })
    // console.log(this.itemArray);
    this.myUid = localStorage.getItem('uid');

    this.depList = db.list('departments');
    this.offList = db.list('offices');
    this.jobList = db.list('jobs');


    this.jobList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.jobArray.push(x as jobTitlesListData)
      })
    })
    // console.log(this.itemArray);
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
    // console.log(this.depArray);


  }

  ngOnInit() {
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.fire.auth.currentUser.sendEmailVerification()
      // .then(() => {
      //   this.route.navigate(['login']);
      // })
  }



  addEmp() {
    this.fire.auth.createUserWithEmailAndPassword(this.data.email, this.data.pw)
      .then(user => {
        this.SendVerificationMail(); // Sending email verification notification, when new user registers

        console.log(this.data.email, this.data.pw)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('email', this.fire.auth.currentUser.email)

        this.fire.authState.subscribe(auth => {
          if (auth) {
            localStorage.setItem('uid', auth.uid)
            this.itemList.push(
              {
              email: this.data.email,
              role: this.data.role,
              emp_job: this.data.emp_job,
              dep_name: this.data.dep_name,
              emp_name: this.data.emp_name,
              emp_phone: this.data.emp_phone,
              emp_address: this.data.emp_address,
              emp_birth: this.data.emp_birth,
              emp_militry: this.data.emp_militry,
              emp_start: this.data.emp_start,
              emp_edu: this.data.emp_edu,
              documents: this.data.documents,
              image: this.data.image,
              job_off: this.data.job_off,
              uid: auth.uid
            }

            )
            this.userList.push({
              email: this.data.email,
              role:this.data.role,
              uid: auth.uid
            })
            this.SendVerificationMail(); // Sending email verification notification, when new user registers

          }
                  console.log(this.data);

        })  

        this.route.navigate(['employees'])
      }).catch(error => {
        console.error(error)
      })
  }



  // addEmp(formValue) {
  //   this.isSubmitted = true;
  //   if (this.formTemplate.valid) {
  //     this.itemList.push(formValue);
  //     this.itemArray = [];
  //     // this.resetForm();
  //     // this.route.navigate(['/departments'])
  //   }
  //   // console.log(formValue);
  // // }

  // get formControls() {
  //   return this.formTemplate['controls'];
  // }

  // resetForm() {
  //   this.formTemplate.reset();
  //   this.formTemplate.setValue({
  //     emp_job: '',
  //     dep_name: '',
  //     emp_name: '',
  //     emp_address: '',
  //     emp_birth: '',
  //     emp_militry: '',
  //     emp_start: '',
  //     emp_edu: '',
  //     documents: '',
  //     image: '',
  //   });
  //   this.isSubmitted = false;
  // }

  onDelete($key) {
    this.itemList.remove($key);
    this.itemArray = [];
  }

  details(key) {
    this.route.navigate(['emp-details/' + key])
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