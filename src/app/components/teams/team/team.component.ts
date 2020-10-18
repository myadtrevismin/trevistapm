import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TeammodComponent } from '../teammod/teammod.component';
import {Team} from 'src/app/models/teams/team';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserModel } from 'src/app/models/discussions/discussion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermodComponent } from '../usermod/usermod.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeamComponent implements OnInit, AfterViewInit {

  constructor(private dialog: MatDialog,
              private adminService: AdminService,
              private fb: FormBuilder) { }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Team>;
  teams: Team[];
  displayedColumns: string[] = ['name'];
  expandedElement: Team | null;
  selectedUsers;
  users: UserModel[];
  memberForm: FormGroup;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadTeams();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addTeam(): void{
    const dialogRef = this.dialog.open(TeammodComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.valid){
        this.adminService.addTeam(result.value);
      }
    });
  }

  addMembers(): void{
    const dialogRef = this.dialog.open(UsermodComponent, {
      data: {teams: this.dataSource.data, users: this.users}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.valid){
        this.adminService.updateTeamMembers(result.value);
      }
    });
  }

  loadTeams(): void{
    this.adminService.getTeams().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Team)
        } ;
      });
    });
  }

  loadUsers(): void{
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

}
