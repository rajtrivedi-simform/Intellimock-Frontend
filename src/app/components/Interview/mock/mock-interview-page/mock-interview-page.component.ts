import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
import { DataSharingService } from '../../../../services/common/data-sharing.service';
import { QuesAnswerObj } from '../../../../constants/types';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../../../services/interviews/interview.service';

@Component({
  selector: 'app-mock-interview',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './mock-interview-page.component.html',
  styleUrls: ['./mock-interview-page.component.css'],
})
export class MockInterviewPageComponent implements OnInit {
  private _intId: string = '';
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  videoStream!: MediaStream;
  question: string[] = [];
  answers: Array<QuesAnswerObj> = [];
  currentAnswer: string = '';
  answeredQuestion: number = 0;

  constructor(
    private _dataShare: DataSharingService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _feedback: InterviewService
  ) {
    this._route.paramMap.subscribe((params) => (this._intId = params.get('id') as string));
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.navigator.mediaDevices) {
      this.startWebcam();
    }

    if (typeof window !== 'undefined' && localStorage) {
      this.question = JSON.parse(localStorage.getItem('Questions') as string);
    }

    this._dataShare._subject.subscribe({
      next: (data) => {
        if (data instanceof Array) {
          // this.question = data;
          this.question = [
            'Describe a situation where you had to explain a complex technical concept to a non-technical person (e.g., someone in HR). How did you approach it, and what were the key strategies you used to ensure they understood?',
            'Imagine HR is implementing a new performance review system that relies heavily on data and algorithms. What potential biases might arise within this system, and how could a developer contribute to mitigating them during development?',
            'HR is considering using an AI-powered chatbot for initial candidate screening. What are some ethical considerations a developer should be aware of when building such a system, especially concerning fairness and transparency?',
            'Suppose HR needs a tool to track employee training and certifications. Briefly outline the key features you would include in the database schema to ensure data integrity and efficient reporting.',
            'You are asked to build an API endpoint for HR to retrieve anonymized employee data for diversity and inclusion reporting. What measures would you take to ensure the data is truly anonymized and complies with privacy regulations like GDPR or CCPA?',
          ];
        }
      },
    });
  }

  startWebcam(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.videoStream = stream;
        if (this.videoElement.nativeElement) {
          this.videoElement.nativeElement.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }

  ngOnDestroy() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
    }
  }

  nextQuestion() {
    if (this.answeredQuestion < this.question.length - 1) {
      const answerObj: QuesAnswerObj = {
        question: this.question[this.answeredQuestion],
        answer: this.currentAnswer,
      };

      this.answers.push(answerObj);
      this.currentAnswer = '';
      this.answeredQuestion++;
    } else {
      const answerObj: QuesAnswerObj = {
        question: this.question[this.answeredQuestion],
        answer: this.currentAnswer,
      };

      this.answers.push(answerObj);
      // form logic to submit the answers
      console.log(this.answers);
      this._feedback.generateFeedbackMockInterview(this.answers).subscribe({
        next: (res) => {
          this._dataShare.onChangeObj(res.data);
          this._router.navigateByUrl(`/feedback/${this._intId}`);
        },
        error: (error) => {
          if (error instanceof Error) {
            console.error(error);
          }
        },
      });
    }
  }
}
