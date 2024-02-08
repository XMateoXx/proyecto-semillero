import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/auth/login.service';
import { Users } from 'src/app/service/auth/users';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, OnDestroy{
  userLoginOn:boolean=false;
  userData?:Users;
  constructor(private router: Router, private loginService: LoginService) {}
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });
 
    this.loginService.currentUserData.subscribe({
      next:(userData)=>{
        this.userData=userData;
      }
    })

  }
}
