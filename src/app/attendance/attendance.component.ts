import { Component, OnInit, Input } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
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
    uid: ''
  }
  @Input('ngModel')

  filterddata = {
    date: '',
    filter_date: '',
  }
  searchText;
  itemArray = [];
  itemList: AngularFireList<any>;
  empname;
  empArray = [];
  empList: AngularFireList<any>;
  myUID = 'WUIbfJ0i4iXvk5OeI7LhWPoX9Df2';
  filterdList: AngularFireList<any>;
  filterdarray = [];
  displayedArray: any[];

  constructor(public db: AngularFireDatabase, private fire: AngularFireAuth) {
    this.itemList = db.list('attendance')
    // this.filteredList = db.list('attendance').valueChanges()
    this.empList = db.list('employees');

    // this.itemList.snapshotChanges().subscribe(res => {
    //   res.forEach(item => {
    //     let x = item.payload.toJSON();
    //     x['$key'] = item.key;
    //     this.itemArray.push(x as attendanceListData)
    //     // console.log(this.itemArray)
    //   })
    // })

    // this.empList.snapshotChanges().subscribe(res => {
    //   res.forEach(item => {
    //     let x = item.payload.toJSON();
    //     x['$key'] = item.key;
    //     this.empArray.push(x as employeesListData)
    //     console.log(this.empArray)
    //   })
    // })

    // console.log(this.empArray)

    // this.GetEmpName(this.myUID)
    // console.log(this.empname)
    // this.filter(this.myUID);

    // console.log(this.email);

    // this.filterdList.snapshotChanges().subscribe(res => {
    //   res.forEach(item => {
    //     let x = item.payload.toJSON();
    //     x['$key'] = item.key;
    //     this.filterdarray.push(x as employeesListData)
    //     console.log(this.filterdarray)
    //   })
    // })
    // console.log(this.filterdarray)
  }





  // GetEmpName(UID) {
  //   this.empList.snapshotChanges().subscribe(res => {
  //     res.forEach(item => {
  //       let x = item.payload.toJSON();
  //       x['$key'] = item.key;
  //       this.empArray.push(x as employeesListData)
  //       this.empArray.filter(data => {
  //         if (data.uid === UID) {
  //           return data.emp_name
  //         }
  //       })
  //       // console.log(this.empArray)
  //     })
  //   })
  // }


  dateFilter() {
    // console.log(this.itemArray)
    this.filterdList = this.db.list('attendance', ref => ref.orderByChild('att_date').startAt(this.filterddata.date).endAt(this.filterddata.filter_date));
    // console.log(this.filterddata.date, this.filterddata.filter_date)
    this.filterdList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.filterdarray.push(x as attendanceListData)
        console.log(this.filterdarray)
        this.filterdarray.forEach(AttendDay => {
          this.empList.snapshotChanges().subscribe(res => {
            res.forEach(item => {
              let y = item.payload.toJSON();
              // y['$key'] = item.key;
              this.empArray.push(y as employeesListData)
              this.empArray.forEach(Emp => {
                if (Emp['uid'] == AttendDay['uid']) {
                  AttendDay['EmpName'] = Emp['emp_name'];
                  // console.log(Emp['emp_name']);
                }
              });
            });
            return this.filterdarray;
          })
        })
      })
      if (this.filterdarray.length === 0) {
        this.displayedArray = this.itemArray
      } else {
        this.displayedArray = this.filterdarray;
      }
    })

  }

  BindEmps() {

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        // x['$key'] = item.key;
        this.itemArray.push(x as attendanceListData)
        this.itemArray.forEach(AttendDay => {
          this.empList.snapshotChanges().subscribe(res => {
            res.forEach(item => {
              let y = item.payload.toJSON();
              // y['$key'] = item.key;
              this.empArray.push(y as employeesListData)
              this.empArray.forEach(Emp => {
                if (Emp['uid'] == AttendDay['uid']) {
                  AttendDay['EmpName'] = Emp['emp_name'];
                  // console.log(Emp['emp_name']);
                }
              });
            });
            return this.itemArray;
          })
          // console.log(this.itemArray)
        })
      })
    })
  }

  clearFilter(){
    console.log(this.itemArray);
    this.displayedArray = this.itemArray;
  }

  ngOnInit() {
    this.BindEmps();
    this.dateFilter();
    // this.filter(this.myUID)
  }

}
export class attendanceListData {
  $key: string;
  uid: string;
  from: string;
  to: string;
  att_date: string;
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