import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/common/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LogoutService } from '../../../services/auth/logout.service';

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
    private _router: Router,
    private _authCheck: AuthService,
    private _toast: ToastrService,
    private _logout: LogoutService
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

    if (typeof window !== 'undefined') {
      this.isLogin.set(localStorage.getItem('isLogin') === 'true');
    }
  }

  logout() {
    this._logout.logout().subscribe({
      next: () => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('isLogin', 'false');
        }
        this._toast.clear();
        this._toast.success('Logout Success');
        setTimeout(() => {
          this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._router.navigate(['/login']);
          });
        }, 0);
      },
      error: () => {
        this._toast.error('Error Logging Out');
      },
    });
  }
}