import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-menubar-docente',
  templateUrl: './menubar-docente.component.html',
  styleUrls: ['./menubar-docente.component.css']
})
export class MenubarDocenteComponent {

  constructor(private router: Router, private loginService: LoginService) {}

  cerrarIngreso() {
    this.router.navigateByUrl('/login');
    this.loginService.clearJWT();
  }
}
