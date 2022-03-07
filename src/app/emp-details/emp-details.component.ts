import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

  id: any;
  itemList: AngularFireList<any>
  itemArray = [];
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


  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {

    this.route.params.subscribe(res =>
      this.id = res
    );

    this.itemList = db.list('employees');

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        if (item.key === this.id['id']) {
          console.log(item.key);
          this.itemArray.push(x as employeesListData)
          this.data.emp_name = this.itemArray[0]['emp_name'];
          this.data.emp_job = this.itemArray[0]['emp_job'];
          this.data.job_off = this.itemArray[0]['job_off'];
          this.data.role = this.itemArray[0]['role'];
          this.data.email = this.itemArray[0]['email'];
          this.data.image = this.itemArray[0]['image'];
          this.data.documents = this.itemArray[0]['documents'];
          this.data.emp_edu = this.itemArray[0]['emp_edu'];
          this.data.emp_start = this.itemArray[0]['emp_start'];
          this.data.emp_militry = this.itemArray[0]['emp_militry'];
          this.data.emp_birth = this.itemArray[0]['emp_birth'];
          this.data.emp_address = this.itemArray[0]['emp_address'];
          this.data.emp_phone = this.itemArray[0]['emp_phone'];
          this.data.dep_name = this.itemArray[0]['dep_name'];

        }
      })
    })
    console.log(this.itemArray);

  }

  ngOnInit() {
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