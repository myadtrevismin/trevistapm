import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/discussions/discussion';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  templateUrl: './teammod.component.html',
  styleUrls: ['./teammod.component.scss']
})
export class TeammodComponent implements OnInit {

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<TeammodComponent>,
              private adminService: AdminService ) { }

  teamForm: FormGroup;
  users: UserModel[];

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      members: ['', Validators.required]
    });

    this.loadUsers();
  }

  loadUsers(): any{
    this.adminService.listUsers().subscribe(
      data => {
        this.users = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as UserModel)
          } ;
        });
      }
    );
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
