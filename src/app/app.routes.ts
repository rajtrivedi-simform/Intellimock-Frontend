import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/home/home.component').then((home) => home.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/home/auth/login/login.component').then((login) => login.LoginComponent),
    data: {
      formType: 'Login',
    },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/home/auth/login/login.component').then(
        (register) => register.LoginComponent
      ),
    data: {
      formType: 'Register',
    },
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./components/Question/questionpage/questionpage.component').then(
        (que) => que.QuestionpageComponent
      ),
  },
  {
    path: 'question/:id',
    loadComponent: () =>
      import('./components/Question/page/page.component').then((pa) => pa.PageComponent),
  },
];
