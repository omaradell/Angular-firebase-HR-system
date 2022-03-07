import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-off-details',
  templateUrl: './off-details.component.html',
  styleUrls: ['./off-details.component.css']
})
export class OffDetailsComponent implements OnInit {

  id: any;
  itemList: AngularFireList<any>
  itemArray = [];
   data = {
    office_name: '',
    office_location: '',
    office_type: '',
    office_desc: '',
    office_dep:''
  }


  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {

    this.route.params.subscribe(res =>
      this.id = res
    );

    this.itemList = db.list('offices');

    this.itemList.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        if (item.key === this.id['id']) {
          console.log(item.key);
          this.itemArray.push(x as officesListData)
          this.data.office_name = this.itemArray[0]['office_name'];
          this.data.office_location = this.itemArray[0]['office_location'];
          this.data.office_type = this.itemArray[0]['office_type'];
          this.data.office_desc = this.itemArray[0]['office_desc'];
          this.data.office_dep = this.itemArray[0]['office_dep'];


        }
      })
    })
    console.log(this.itemArray);

  }

  ngOnInit() {
  }

  

}

export class officesListData {
  $key: string;
  office_name: string;
  office_desc: string;
  office_location: string;
  office_type: string;
  office_dep:string;
}