import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  Payment
} from 'src/app/models/payments/payment';
import {
  Task
} from 'src/app/models/tasks/task';


@Component({
  templateUrl: './paymodal.component.html',
  styleUrls: ['./paymodal.component.scss']
})
export class PaymodalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < PaymodalComponent > ,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {}

  public payForm: FormGroup;
  public submitted = false;

  ngOnInit(): void {
    this.payForm = this.fb.group({
      id: [''],
      amount: ['', Validators.required],
      payDate: ['', Validators.required],
      paymentType: ['', Validators.required],
      paidBy: ['', Validators.required],
      status: ['', Validators.required],
      notes: [''],
      file: [''],
    });

    this.paymentPatch();
  }

  paymentPatch(): void{
    console.log(this.data);
    if (this.data !== undefined && this.data !== null){
      this.data.payDate = this.data.payDate.toDate();
      this.payForm.patchValue(this.data);
    }
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
