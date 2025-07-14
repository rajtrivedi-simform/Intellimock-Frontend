import { Component, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-interview-prep',
  imports: [RouterLink],
  templateUrl: './interview-prep.component.html',
  styleUrl: './interview-prep.component.css',
})
export class InterviewPrepComponent {
  isLogin = signal(false);

  ngOnInit() {
    if (typeof window != 'undefined') {
      this.isLogin.set(localStorage.getItem('isLogin') === 'true');
    }
  }
}
