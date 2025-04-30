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

  ngOnInit() {
    if (typeof window !== 'undefined' && window.navigator.mediaDevices) {
      this.startWebcam();
    }

    if (typeof window !== 'undefined' && localStorage) {
      this.question = JSON.parse(localStorage.getItem('Questions') as string);
    }

    this._dataShare._subject.subscribe({
      next: (data) => {
        if (data instanceof Array) {
          this.question = data;
        }
      },
    });

    document.addEventListener('visibilitychange', this.handleTabSwitch);
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

    document.removeEventListener('visibilitychange', this.handleTabSwitch);
  }

  handleTabSwitch() {
    if (document.hidden) {
      alert('Interview Ended!!');
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
