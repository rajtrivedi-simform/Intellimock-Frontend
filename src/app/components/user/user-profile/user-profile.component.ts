import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { UserService } from '../../../services/User/user.service';
import {
  codeInterviewData,
  mockInterviewData,
  userProfileResponse,
} from '../../../constants/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  constructor(private _userService: UserService) {}
  user: userProfileResponse['data']['user'] = {
    userId: '',
    userFullName: '',
    userEmail: '',
    resumeData: [],
  };

  activeTab: 'mock' | 'code' = 'mock';

  mockInterviews: mockInterviewData[] = [];

  codeInterviews: codeInterviewData[] = [];

  ngOnInit() {
    this._userService.getUserDetails().subscribe({
      next: (res) => {
        this.user = res.data.user;
        this.mockInterviews = res.data.mockInterviewData;
        this.codeInterviews = res.data.codeInterviewData;
        console.log(res.data);
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
