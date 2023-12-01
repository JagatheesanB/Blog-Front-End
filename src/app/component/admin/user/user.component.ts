import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  error: string = '';
  userDetails: User[] = [];
  userDetail: User = {
    id: 0,
    username: '',
    name: '',
    roles: '',
    joinedAt: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: User[] = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
          // this.userDetail = userDetails[0];
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
