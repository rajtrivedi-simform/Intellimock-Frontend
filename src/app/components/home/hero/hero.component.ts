import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  isLogin = signal(false);

  constructor() {
    if (typeof window != 'undefined') {
      this.isLogin.set(localStorage.getItem('isLogin') === 'true');
    }
  }
}
