import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-interview-prep',
  imports: [RouterLink],
  templateUrl: './interview-prep.component.html',
  styleUrl: './interview-prep.component.css',
})
export class InterviewPrepComponent {
  isLogin = signal(localStorage.getItem('isLogin') === 'true');
}
