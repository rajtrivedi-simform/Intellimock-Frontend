import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
import { questionObj } from '../../../../constants/types';
import { DataSharingService } from '../../../../services/common/data-sharing.service';

@Component({
  selector: 'app-mock-interview',
  imports: [HeaderComponent],
  templateUrl: './mock-interview-page.component.html',
  styleUrls: ['./mock-interview-page.component.css'],
})
export class MockInterviewPageComponent implements OnInit {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  videoStream!: MediaStream;
  question: string[] = [];

  answer: string =
    'Angular provides modular development, dependency injection, TypeScript support, and a powerful CLI tool.';

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

          console.log(data);
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
}
