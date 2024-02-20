import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/service/auth/login.service';
import { Users } from 'src/app/service/auth/users';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  userData?: Users;
  badgevisible = false;
  private unsubscribe$ = new Subject<void>();



  constructor(private router: Router, private loginService: LoginService) {}
  
  
  badgevisibility() {
    this.badgevisible = true;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      });

    this.loginService.currentUserData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (userData) => {
          this.userData = userData;
        }
      });
  }

  cerrarIngreso() {
    this.router.navigateByUrl('/login');
    this.loginService.clearJWT();
  }
}
