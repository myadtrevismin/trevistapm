import { Component, OnInit } from '@angular/core';
import { Discussion } from 'src/app/models/discussions/discussion';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DiscussionService } from 'src/app/services/discussions/discussion.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DiscussionModelComponent } from './discussion-model/discussion-model.component';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  constructor(private discussionService: DiscussionService,
              private authService: AuthService,
              private datePipe: DatePipe,
              public dialog: MatDialog) { }

  htmlText;
  discussions: Discussion[];

  ngOnInit(): void {
    this.getDiscussions();
  }

  // tslint:disable-next-line: typedef
  getDiscussions(){
    this.discussionService.getDiscussions().subscribe(data => {
      this.discussions = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Discussion)
        } ;
      });
    });
  }

  // tslint:disable-next-line: typedef
  openDialog(discussionItem) {
    const dialogRef = this.dialog.open(DiscussionModelComponent, {
      data: {discussionItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null || result !== undefined){
        console.log(result);
        this.discussionService.saveDiscussionResponse(result).then(x =>  console.log(x));
      }
      console.log(`Dialog result: ${JSON.stringify(result.responses)}`);
    });
  }

  // tslint:disable-next-line: typedef
  postedMessage(){
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
    this.discussionService.saveDiscussion(message).then(x => {  console.log(x); });
  }

}
