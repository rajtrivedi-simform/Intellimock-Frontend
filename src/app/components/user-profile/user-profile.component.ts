import { Component } from '@angular/core';
import { UserProfileService } from '../../services/User/user-profile.service';
import { error } from 'console';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  constructor(private _userService: UserProfileService) {}

  ngOnInit() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this._userService.getUserProfile().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      },
    });
  }
}
