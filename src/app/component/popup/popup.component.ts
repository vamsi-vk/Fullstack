import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import {NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private buildr: FormBuilder,
    private service: MasterService,
    private toast:NgToastService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.code>0){
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata(code: any) {
    this.service.GetCustomerbycode(code).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({id:this.editdata.id,title:this.editdata.course,completed:this.editdata.completed,
      status:this.editdata.status})
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    title: this.buildr.control(''),
    completed: this.buildr.control(''),
    status: this.buildr.control(true)
  });

  Saveuser() {
    this.service.addcourse(this.myform.value).subscribe((res:any) => {
      this.toast.success({detail:"Successs",summary:res})
      this.closepopup();
    },
    
    err=>{
      this.toast.error({detail:"Error", summary:"Please check the values once again "})
    })
  }
}
