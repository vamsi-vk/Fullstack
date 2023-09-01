import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  dataLoaded = false;
  inputdata: any;
  custdata: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<UserdetailComponent>,
    private service: MasterService) {


  }
  ngOnInit(): void {
    this.inputdata = this.data;
    this.service.GetCustomerbycode(this.inputdata).subscribe(item => {
      this.custdata = item;
      this.dataLoaded = true;
      console.log("Custdata:", this.custdata);
    });
    
  }
  
  // ngOnInit(): void {
  //   this.inputdata = this.data;
  //   console.log("userdtetails"+this.inputdata)
  //  this.service.GetCustomerbycode(this.inputdata).subscribe(item => {
  //   this.custdata=item;
  //   console.log(this.custdata)
  //       console.log(item)        //console.log(JSON.parse(this.custdata))
  //     });
  //   }
  

  closepopup(){
    this.ref.close('closing from detail');
  }


}
