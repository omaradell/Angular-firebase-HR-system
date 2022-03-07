import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {


  id: any;
  itemList: AngularFireList<any>
  itemArray = [];
  data = {
    job_name: '',
    job_desc: '',
    min_sallary: '',
    max_sallary: '',
    job_off: '',
    job_dep: ''
  }


  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {

    this.route.params.subscribe(res =>
      this.id = res
    );

    this.itemList = db.list('jobs');

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        if (item.key === this.id['id']) {
          console.log(item.key);
          this.itemArray.push(x as jobTitlesListData)
          this.data.job_name = this.itemArray[0]['job_name'];
          this.data.job_desc = this.itemArray[0]['job_desc'];
          this.data.min_sallary = this.itemArray[0]['min_sallary'];
          this.data.max_sallary = this.itemArray[0]['max_sallary'];
          this.data.job_off = this.itemArray[0]['job_off'];
          this.data.job_dep = this.itemArray[0]['job_dep'];
        }
      })
    })
    console.log(this.itemArray);

  }

  ngOnInit() {
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
