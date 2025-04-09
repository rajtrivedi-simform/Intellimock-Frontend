import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { HeaderComponent } from '../common/header/header.component';
import { FeatureComponent } from './feature/feature.component';
import { DemoAiComponent } from './demo-ai/demo-ai.component';
import { FooterComponent } from '../common/footer/footer.component';
import { InterviewPrepComponent } from './interview-prep/interview-prep.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    HeroComponent,
    FeatureComponent,
    DemoAiComponent,
    InterviewPrepComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
