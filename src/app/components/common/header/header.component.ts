import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  hidden = false;
  isLogin = signal(false);

  constructor(
    private route: ActivatedRoute,
    private authCheck: AuthService,
    private router: Router
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      if (data['formType']) {
        this.hidden = true;
      }
    });

    this.authCheck.isLoginCheck().subscribe(
      (res: any) => {
        this.isLogin.set(res.status === 200);
        localStorage.setItem('isLogin', 'true');
      },
      (err) => {
        this.isLogin.set(false);
        localStorage.setItem('isLogin', 'false');
      }
    );
  }
}
