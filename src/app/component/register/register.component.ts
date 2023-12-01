import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registers: Register[] = [];
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };

  constructor(private authService: AuthService, private router: Router) {}

  Name: string = '';
  UserName: string = '';
  Password: string = '';
  Role: string = '';

  onSubmit(form: any) {
    const newregister: Register = {
      username: this.UserName,
      password: this.Password,
      name: this.Name,
      role: this.Role,
    };
    this.authService.register(newregister).subscribe({
      next: (response: AppResponse) => {
        this.registers.push(response.data);
        this.router.navigate(['/login']);
      },
    });
  }
}
