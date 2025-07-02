import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./components/Question/questionpage/questionpage.component').then(
        (que) => que.QuestionpageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'question/:id',
    loadComponent: () =>
      import('./components/Question/page/page.component').then((pa) => pa.PageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'interviews',
    loadComponent: () =>
      import('./components/Interview/interviewform/interviewform.component').then(
        (int) => int.InterviewformComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'interviews/Mock-Interview',
    loadComponent: () =>
      import('./components/Interview/mock/mockint/mockint.component').then(
        (mock) => mock.MockInterviewComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'interviews/Mock-Interview/:id',
    loadComponent: () =>
      import('./components/Interview/mock/mock-interview-page/mock-interview-page.component').then(
        (mock) => mock.MockInterviewPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'interviews/Coding-Interview',
    loadComponent: () =>
      import('./components/Interview/code/codeint/codeint.component').then(
        (code) => code.CodeintComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'interviews/Coding-Interview/:id',
    loadComponent: () =>
      import('./components/Interview/code/code-interview-page/code-interview-page.component').then(
        (code) => code.CodeInterviewPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'feedback/:id',
    loadComponent: () =>
      import('./components/Interview/feedback/feedback.component').then(
        (fb) => fb.FeedbackComponent
      ),
    canActivate: [authGuard],
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
    path: '**',
    loadComponent: () =>
      import('./components/common/not-found/not-found.component').then(
        (nf) => nf.NotFoundComponent
      ),
  },
];
