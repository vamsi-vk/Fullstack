
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {NgToastService} from 'ng-angular-popup'
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/service/master.service';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { UserdetailComponent } from '../component/userdetail/userdetail.component';
import { PopupComponent } from '../component/popup/popup.component';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent     {

  customerlist !: Customer[];
  dataSource: any;
  displayedColumns: string[] = ["ID", "course",  "status", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog, private toast :NgToastService,) { 
     this.loadcustomer()
  }
  
 OnInit(){

 }

  loadcustomer() {
    this.service.GetCustomer({}).subscribe(res => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource<Customer>(this.customerlist);
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }


  Filterchangeid(data: Event) {
    const value1 = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value1;
    const obj={id:value1}
    this.service.GetCustomer(obj).subscribe((res: any) => {
    console.log(res);
    this.dataSource.data = res;
    });

  }
  Filterchangecourse(data: Event) {
    const value1 = (data.target as HTMLInputElement).value;
    const obj={title:value1}
      this.service.GetCustomer(obj).subscribe((res: any) => {
      console.log("filter",res)
    this.dataSource.data=res;
    }); 
  }
  Filterchangestatus(data: Event) {
    const value1 = (data.target as HTMLInputElement).value;
    const obj ={completed:value1}
    this.service.GetCustomer(obj).subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res;
    });
  }
  
  details(code: any) {
    const vk = this.dialog.open(UserdetailComponent,{
      data:code})
      console.log("details"+code)
  }

  delete1(data:any){
    console.log(data)
    this.service.deletecourse(data).subscribe((res:any) => {
      this.toast.success({detail:"Successs",summary:res})
    
      this.loadcustomer()
    },
    err=>{
      this.toast.error({detail:"error",summary:"please enter proper values"})

    }
    );
  }


  addcourse(){
    this.Openpopup(0, 'Add Customer',PopupComponent);
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1ms',
      exitAnimationDuration: '100ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadcustomer();
    })
  }
  editcustomer(code: any) {
    const customerToEdit = this.customerlist.find(customer => customer.id === code);
    const dialogRef = this.dialog.open(EditPopupComponent, {
      width: '40%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: customerToEdit
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadcustomer();
    });
  }
 
}


