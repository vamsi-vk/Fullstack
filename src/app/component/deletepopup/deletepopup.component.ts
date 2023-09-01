import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.css'],
})
export class DeletepopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DeletepopupComponent>,
    private service: MasterService,
    private toast: NgToastService
  ) {}

  onDelete(): void {
    this.service.deletecourse(this.data.id).subscribe((res: any) => {
      console.log(res);
      this.toast.success({ detail: 'Successs', summary: res });
      this.ref.close(true);
    });
  }

  onCancel(): void {
    this.ref.close(false);
  }
}
