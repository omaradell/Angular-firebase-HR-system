import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from '@angular/fire/database'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  passwordc: string = '';
  role: string = '';

  itemList: AngularFireList<any>

  constructor(private fire: AngularFireAuth, private route: Router, public db: AngularFireDatabase) {
    this.itemList = db.list('users')
  }
  ngOnInit() {
  }


  register() {
    if(this.password === this.passwordc){
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        console.log(this.email, this.password)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('email', this.fire.auth.currentUser.email)

        this.fire.authState.subscribe(auth => {
          if (auth) {
            localStorage.setItem('uid', auth.uid)
            this.itemList.push({
              email: this.email,
              role:this.role,
              uid: auth.uid
            })
          }
        })
        this.route.navigate(['login'])
      })
      .catch(error => {
        console.error(error)
      })
    }
  }

}
