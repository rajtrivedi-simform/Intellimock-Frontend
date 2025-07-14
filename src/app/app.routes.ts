import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'questions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Question/questionpage/questionpage.component').then(
        (que) => que.QuestionpageComponent
      ),
  },
  {
    path: 'question/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Question/page/page.component').then((pa) => pa.PageComponent),
  },
  {
    path: 'interviews',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Interview/interviewform/interviewform.component').then(
        (int) => int.InterviewformComponent
      ),
  },
  {
    path: 'interviews/Mock-Interview',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Interview/mock/mockint/mockint.component').then(
        (mock) => mock.MockInterviewComponent
      ),
  },
  {
    path: 'interviews/Mock-Interview/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Interview/mock/mock-interview-page/mock-interview-page.component').then(
        (mock) => mock.MockInterviewPageComponent
      ),
  },
  {
    path: 'interviews/Coding-Interview',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Interview/code/codeint/codeint.component').then(
        (code) => code.CodeintComponent
      ),
  },
  {
    path: 'interviews/Coding-Interview/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Interview/code/code-interview-page/code-interview-page.component').then(
        (code) => code.CodeInterviewPageComponent
      ),
  },
  {
    path: 'feedback/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/Interview/feedback/feedback.component').then(
        (fb) => fb.FeedbackComponent
      ),
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
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/user/user-profile/user-profile.component').then(
        (up) => up.UserProfileComponent
      ),
  },
  // {
  //   path: 'feedback/:id',
  //   component:
  // },
  {
    path: 'form',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/user/user-profile-form/user-profile-form.component').then(
        (up) => up.UserProfileFormComponent
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
