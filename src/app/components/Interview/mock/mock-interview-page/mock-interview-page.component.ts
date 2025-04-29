import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
import { DataSharingService } from '../../../../services/common/data-sharing.service';
import { QuesAnswerObj } from '../../../../constants/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mock-interview',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './mock-interview-page.component.html',
  styleUrls: ['./mock-interview-page.component.css'],
})
export class MockInterviewPageComponent implements OnInit {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  videoStream!: MediaStream;
  question: string[] = [];
  answers: Array<QuesAnswerObj> = [];
  currentAnswer:string = ""
  answeredQuestion:number = 0

  constructor(private _dataShare: DataSharingService) {}

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
          this.question = data;
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

  nextQuestion(){
    if(this.answeredQuestion < this.question.length-1){
      const answerObj: QuesAnswerObj = {
        question: this.question[this.answeredQuestion],
        answer: this.currentAnswer
      }

      this.answers.push(answerObj);
      this.currentAnswer = ""
      this.answeredQuestion++;
    } else {
      const answerObj: QuesAnswerObj = {
        question: this.question[this.answeredQuestion],
        answer: this.currentAnswer
      }

      this.answers.push(answerObj);
      // form logic to submit the answers
      console.log(this.answers)
    }
  }
}
