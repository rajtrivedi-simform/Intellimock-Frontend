import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-feature',
  imports: [CardComponent],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {
  features = [
    {
      title: 'AI-Powered Interviews',
      description: 'Our AI simulates real interviewers from different industries and seniority levels for the most realistic experience.',
      icon: 'assets/icons/ai-interview.svg'
    },
    {
      title: 'Detailed Feedback',
      description: 'Receive immediate personalized feedback on your answers, communication skills, and areas for improvement.',
      icon: 'assets/icons/feedback.svg'
    },
    {
      title: 'Performance Analytics',
      description: 'Track your progress over time with detailed analytics and see how you improve with each practice session.',
      icon: 'assets/icons/analytics.svg'
    },
    {
      title: 'Interview Templates',
      description: 'Choose from a variety of pre-designed interview scenarios for technical, behavioral, and industry-specific roles.',
      icon: 'assets/icons/templates.svg'
    },
    {
      title: 'Time Management',
      description: 'Practice answering questions within time constraints to improve your speed and conciseness.',
      icon: 'assets/icons/time.svg'
    },
    {
      title: 'Certification Badges',
      description: 'Earn digital badges that showcase your interview proficiency to potential employers.',
      icon: 'assets/icons/badges.svg'
    }
  ];
}
