import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-dep-details',
  templateUrl: './dep-details.component.html',
  styleUrls: ['./dep-details.component.css']
})
export class DepDetailsComponent implements OnInit {

  id: any;
  itemList: AngularFireList<any>
  itemArray = [];
  data = {
    dep_name: '',
    dep_location: '',
    dep_type: '',
    dep_desc: '',
    
  }


  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {

    this.route.params.subscribe(res =>
      this.id = res
    );

    this.itemList = db.list('departments');

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        if (item.key === this.id['id']) {
          console.log(item.key);
          this.itemArray.push(x as departmentsListData)
          this.data.dep_name = this.itemArray[0]['dep_name'];
          this.data.dep_location = this.itemArray[0]['dep_location'];
          this.data.dep_type = this.itemArray[0]['dep_type'];
          this.data.dep_desc = this.itemArray[0]['dep_desc'];
        }
      })
    })
    console.log(this.itemArray);

  }

  ngOnInit() {
  }

  

}

export class departmentsListData {
  $key: string;
  dep_name: string;
  dep_desc: string;
  dep_location: string;
  dep_type: string;
}
