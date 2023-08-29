import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import {NgToastService} from 'ng-angular-popup'
@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {
  editForm !: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditPopupComponent>,
    private fb: FormBuilder,
    private service: MasterService,
    private toast :NgToastService,
    private buildr: FormBuilder

  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [  this.data.id ],
      // id: [{ value: this.data.id, disabled: true }],
      title: [this.data.course],
      completed: [this.data.completed]
    });
  }

  save() {
    console.log(this.editForm)
    const editedData = this.editForm.value;
    console.log(editedData);
    this.service.editdata(editedData).subscribe((res:any) => {
      this.toast.success({detail:"Successs",summary:res})
      this.dialogRef.close();
    },
    err=>{
      this.toast.error({detail:"error",summary:"please enter proper values"})
    }
    );
  }
  close() {
    this.dialogRef.close();
  }
  myform = this.buildr.group({
    id: this.buildr.control(''),
    course: this.buildr.control(''),
    completed: this.buildr.control(''),
    status: this.buildr.control(true)
  });
  Saveuser() {
    this.service.Savecustomer(this.myform.value).subscribe(res => {
      this.close();
    });
  }

}
