import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Discussion } from 'src/app/models/discussions/discussion';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  templateUrl: './discussion-model.component.html',
  styleUrls: ['./discussion-model.component.scss']
})
export class DiscussionModelComponent implements OnInit {

  htmlText;

  constructor(public dialogRef: MatDialogRef<DiscussionModelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    const message: Discussion = {
      htmlcontent: this.htmlText,
      posteduser: {
        userid: this.authService.user.uid,
        username: this.authService.user.email,
        fullname: this.authService.user.displayName
      },
      date: new Date(),
      responses: []
    };

    if (this.data.discussionItem.responses === undefined || this.data.discussionItem.responses === null){
      this.data.responses = [];
    }

    this.data.discussionItem.responses.push(message);
    this.dialogRef.close(this.data);
  }

}
