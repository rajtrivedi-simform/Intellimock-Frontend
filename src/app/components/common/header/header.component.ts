import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/common/auth.service';
import { LogoutService } from '../../../services/auth/logout.service';
import { ToastrService } from 'ngx-toastr';

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
    private _route: ActivatedRoute,
    private _authCheck: AuthService,
    private _router: Router,
    private _logout: LogoutService,
    private _toast: ToastrService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      if (data['formType']) {
        this.hidden = true;
      }
    });

    this._authCheck.isLoginCheck().subscribe({
      next: (res) => {
        this.isLogin.set(res.status === 200);
        if (typeof window != 'undefined' && typeof localStorage != 'undefined') {
          localStorage.setItem('isLogin', 'true');
        }
      },
      error: () => {
        this.isLogin.set(false);
        if (typeof window != 'undefined' && typeof localStorage != 'undefined') {
          localStorage.setItem('isLogin', 'false');
        }
      },
    });
  }

  logout() {
    this._logout.logout().subscribe({
      next: () => {
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
