import { Component, OnInit } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from '@angular/fire/database'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { UploadService } from '../../app/services/upload.service';
import { Router } from '@angular/router';
import { Url } from 'url';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  }
itemArray = [];
  itemList: AngularFireList<any>;
  userKey: any;
  email;
  myUid: any;
  

  imgSrc: string = "/assets/img/upload.png";
  selectedImage: any = null;
  isSubmitted: boolean;
  imageURL;
  docURL;


  formTemplate = new FormGroup({
    imageUrl: new FormControl('',Validators.required)
  })

  docTemplate = new FormGroup({
    docUrl: new FormControl('',Validators.required)
  })




  constructor(public db: AngularFireDatabase,private storage: AngularFireStorage, public route: Router,private service: UploadService) {
    this.itemList = db.list('employees')
    this.myUid = localStorage.getItem('uid');
    this.email = localStorage.getItem('email');
    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        if (item.payload.child('uid').val() === this.myUid) {
          this.userKey = item.key;
          this.itemArray.push(x as employeesListData)
          this.data.emp_name = this.itemArray[0]['emp_name'];
          this.data.dep_name = this.itemArray[0]['dep_name'];
          this.data.emp_job = this.itemArray[0]['emp_job'];
          this.data.job_off = this.itemArray[0]['job_off'];
          this.data.email = this.itemArray[0]['email'];
          this.data.image = this.itemArray[0]['image'];
          this.data.documents = this.itemArray[0]['documents'];
          this.data.emp_edu = this.itemArray[0]['emp_edu'];
          this.data.emp_start = this.itemArray[0]['emp_start'];
          this.data.emp_militry = this.itemArray[0]['emp_militry'];
          this.data.emp_birth = this.itemArray[0]['emp_birth'];
          this.data.emp_address = this.itemArray[0]['emp_address'];
          this.data.emp_phone = this.itemArray[0]['emp_phone'];
          console.log(this.itemArray);
        }

      })
    })
  }

  ngOnInit() {
    this.service.getUploadDetailList();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/upload.png';
      this.selectedImage = null;
    }
  }

  showDoc(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/img/upload.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `images/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.imageURL = url
            console.log(url)
            this.service.insertUploadDetails(formValue);
            this.resetForm();
            this.itemList.set(this.userKey, {
              email: this.data.email,
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
              job_off: this.data.job_off,
              uid: this.myUid,
              image:this.imageURL
            })
          })
        })
      ).subscribe();
    }
  }

  docSubmit(formValue) {
    this.isSubmitted = true;
    if (this.docTemplate.valid) {
      var filePath = `images/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['docUrl'] = url;
            this.docURL = url
            console.log(url)
            this.service.insertUploadDetails(formValue);
            this.resetForm();
            this.itemList.set(this.userKey, {
              email: this.data.email,
              emp_job: this.data.emp_job,
              dep_name: this.data.dep_name,
              emp_name: this.data.emp_name,
              emp_phone: this.data.emp_phone,
              emp_address: this.data.emp_address,
              emp_birth: this.data.emp_birth,
              emp_militry: this.data.emp_militry,
              emp_start: this.data.emp_start,
              emp_edu: this.data.emp_edu,
              documents: this.docURL,
              job_off: this.data.job_off,
              uid: this.myUid,
              image:this.data.image
            })
          })
        })
      ).subscribe();
    }
  }

  get formControls() {
    return this.formTemplate['controls'] && this.docTemplate['controls'];
  }
  

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
    });
    this.docTemplate.reset();
    this.docTemplate.setValue({
      docUrl: '',
    });
    this.imgSrc = '/assets/img/upload.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }



  onEdit() {

    this.itemList.set(this.userKey, {
      email: this.data.email,
      emp_job: this.data.emp_job,
      dep_name: this.data.dep_name,
      emp_name: this.data.emp_name,
      emp_phone: this.data.emp_phone,
      emp_address: this.data.emp_address,
      emp_birth: this.data.emp_birth,
      emp_militry: this.data.emp_militry,
      emp_start: this.data.emp_start,
      emp_edu: this.data.emp_edu,
      job_off: this.data.job_off,
      image:this.data.image,
      documents:this.data.documents,
      uid: this.myUid,
    })

    this.itemArray = [];
    // this.route.navigate(['/profile'])

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