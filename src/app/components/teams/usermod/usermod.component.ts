import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/discussions/discussion';

@Component({
  templateUrl: './usermod.component.html',
  styleUrls: ['./usermod.component.scss']
})
export class UsermodComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UsermodComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  memberForm: FormGroup;
  users = [];

  ngOnInit(): void {
    this.memberForm = this.fb.group({
      teams: ['', Validators.required],
      members: ['', Validators.required]
    });
    console.log(this.data);
  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.memberForm.controls;
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
