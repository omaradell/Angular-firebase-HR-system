import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';

import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data = {
    email: '',
    uid: '',
    role: '',
  }
  email: string = '';
  password: string = '';
  itemArray = [];
  itemList: AngularFireList<any>;
  userKey: any;
  myUid;
  myRole;

  constructor(private fire: AngularFireAuth, private route: Router, public db: AngularFireDatabase) {
    this.itemList = db.list('users')

  }

  ngOnInit() {
  }

  SendVerificationMail() {
    return this.fire.auth.currentUser.sendEmailVerification()
    // .then(() => {
    //   this.route.navigate(['login']);
    // })
  }

  logIn() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(msg => {
        if (msg.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('Please validate your email address. Kindly check your inbox.');
        } else {
          console.log(this.email, this.password)
          localStorage.setItem('isLoggedIn', 'true')
          this.fire.authState.subscribe(res => {
            if (res) {
              this.itemList.snapshotChanges().subscribe(res => {
                res.forEach(item => {
                  let x = item.payload.toJSON();
                  x['$key'] = item.key;
                  if (item.payload.child('email').val() === this.email) {
                    this.userKey = item.key;
                    this.itemArray.push(x as usersListData)
                    this.data.email = this.itemArray[0]['email'];
                    this.data.uid = this.itemArray[0]['uid'];
                    this.data.role = this.itemArray[0]['role'];
                    localStorage.setItem('role', this.data.role)

                  }

                })
                // this.myRole = localStorage.getItem('role');
                // if (this.myRole === '65ce086b-31dd-4e18-8b29-b04047176e25') {
                //   this.route.navigate(['departments'])

                // } else {
                //   this.route.navigate(['profile'])
                // }
                // this.ngOnInit();

                // this.route.navigate(['home'])
                //   this.route.navigateByUrl('/navbar', { skipLocationChange: true }).then(() => {
                //     this.route.navigate(['home']);
                // });
                this.myRole = localStorage.getItem('role');
                if (this.myRole === '65ce086b-31dd-4e18-8b29-b04047176e25') {
                  this.route.navigate(['/departments'])
                }
                else if (this.myRole === 'c7941c6c-8920-46bf-964e-e046314021e5') {
                  this.route.navigate(['profile'])
                }
                // this.route.navigate(['topbar'])

              })

              // console.log(this.itemArray[0]['role']);
              localStorage.setItem('uid', res.uid)
              localStorage.setItem('email', res.email)
            }
          })

        }

      })
      .catch(error => console.error(error)
      );
  }


}

export class usersListData {
  $key: string;
  email: string;
  uid: string;
  role: string;
}
