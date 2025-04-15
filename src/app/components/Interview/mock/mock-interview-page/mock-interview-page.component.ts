import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';

@Component({
  selector: 'app-mock-interview',
  imports: [HeaderComponent],
  templateUrl: './mock-interview-page.component.html',
  styleUrls: ['./mock-interview-page.component.css'],
})
export class MockInterviewPageComponent implements OnInit {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  videoStream!: MediaStream;

  question: string = 'What are the key features of Angular?';
  answer: string =
    'Angular provides modular development, dependency injection, TypeScript support, and a powerful CLI tool.';

  ngOnInit(): void {
    this.startWebcam();
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
}
