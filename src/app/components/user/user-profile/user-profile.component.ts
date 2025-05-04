import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user = {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com'
  };

  activeTab: 'mock' | 'code' = 'mock';

  mockInterviews = [
    { date: new Date('2024-12-15'), summary: 'Mock Interview on JavaScript fundamentals' },
    { date: new Date('2025-01-20'), summary: 'Mock Interview on System Design basics' }
  ];

  codeInterviews = [
    { date: new Date('2025-03-10'), questionTitle: 'Two Sum Problem' },
    { date: new Date('2025-04-01'), questionTitle: 'Balanced Brackets Validator' }
  ];
}
