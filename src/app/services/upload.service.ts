import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getUploadDetailList() {
    this.uploadList = this.firebase.list('uploadDetails');
  }

  insertUploadDetails(uploadDetails) {
    this.uploadList.push(uploadDetails);
  }
}