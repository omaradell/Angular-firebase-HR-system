import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userdata = {
    email: '',
    role: '',
    uid: '',
  }
  isSubmitted: boolean;
  userKey: any;
  userArray = [];
  userList: AngularFireList<any>;
  myUid: string;
  myRole: string;
  constructor(public db: AngularFireDatabase, public route: Router, private fire: AngularFireAuth) {
    this.myUid = localStorage.getItem('uid');

    this.userList = db.list('users');

    this.userList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        // console.log(item.key);

        if (item.payload.child('uid').val() === this.myUid) {
          // this.userKey = item.key;
          this.userArray.push(x as userListData)
          this.userdata.email = this.userArray[0]['email'];
          this.userdata.role = this.userArray[0]['role'];
          this.userdata.uid = this.userArray[0]['uid'];
        }
        // console.log(this.userdata.role)
      })
      // console.log(this.userdata.role);
      localStorage.setItem('role', this.userdata.role)
    })
    this.myRole = localStorage.getItem('role');
    // console.log(this.myRole);
  }

  ngOnInit() {
  }

}

export class userListData {
  email: string;
  role: string;
  uid: string;
}
