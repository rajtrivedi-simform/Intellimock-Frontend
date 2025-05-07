import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
import { DataSharingService } from '../../../../services/common/data-sharing.service';
import { mockFeedbackPayload, QuesAnswerObj } from '../../../../constants/types';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../../../services/interviews/interview.service';
import { ToastrService } from 'ngx-toastr';
import { TerminateInterviewService } from '../../../../services/interviews/terminate-interview.service';

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
  tabSwitches: number = 0;

  constructor(
    private _dataShare: DataSharingService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _feedback: InterviewService,
    private _toast: ToastrService,
    private _terminate: TerminateInterviewService
  ) {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (typeof id === 'string') {
        this._intId = id;
      }
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.navigator.mediaDevices) {
      this.startWebcam();
    }

    this._dataShare._subject.subscribe({
      next: (data) => {
        if (data instanceof Array) {
          this.question = data;
        }
      },
    });

    if (typeof document != 'undefined') {
      document.addEventListener('visibilitychange', this.handleTabSwitch.bind(this));
    }
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

    if (typeof document != 'undefined') {
      document.removeEventListener('visibilitychange', this.handleTabSwitch.bind(this));
    }
  }

  handleTabSwitch() {
    if (document.hidden) {
      this._terminate.terminate(this._intId).subscribe({
        next: (res) => {
          this._toast.success(res.msg);
          this.ngOnDestroy();
          this._router.navigateByUrl('/');
        },
      });
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
      const payload: mockFeedbackPayload = {
        feedBackArray: this.answers,
        intId: this._intId,
      };
      this._feedback.generateFeedbackMockInterview(payload).subscribe({
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
