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
  {
    path: 'interviews',
    loadComponent: () =>
      import('./components/Interview/interviewform/interviewform.component').then(
        (int) => int.InterviewformComponent
      ),
  },
  {
    path: 'interviews/Mock-Interview',
    loadComponent: () =>
      import('./components/Interview/mock/mockint/mockint.component').then(
        (mock) => mock.MockInterviewComponent
      ),
  },
  {
    path: 'interviews/Mock-Interview/:id',
    loadComponent: () =>
      import('./components/Interview/mock/mock-interview-page/mock-interview-page.component').then(
        (mock) => mock.MockInterviewPageComponent
      ),
  },
  {
    path: 'interviews/Coding-Interview',
    loadComponent: () =>
      import('./components/Interview/code/codeint/codeint.component').then(
        (code) => code.CodeintComponent
      ),
  },
  {
    path: 'interviews/Coding-Interview/:id',
    loadComponent: () =>
      import('./components/Interview/code/code-interview-page/code-interview-page.component').then(
        (code) => code.CodeInterviewPageComponent
      ),
  },
  {
    path: 'feedback/:id',
    loadComponent: () =>
      import('./components/Interview/feedback/feedback.component').then(
        (fb) => fb.FeedbackComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/common/not-found/not-found.component').then(
        (nf) => nf.NotFoundComponent
      ),
  },
];
