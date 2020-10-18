import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-appnavigation',
  templateUrl: './appnavigation.component.html',
  styleUrls: ['./appnavigation.component.scss']
})
export class AppnavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: any;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
  }

  ngOnInit(): void{
    this.user =  JSON.parse(localStorage.getItem('user'));
    // console.log(this.user.);
  }

  logout(): void{
    this.authService.logout();
  }

}
