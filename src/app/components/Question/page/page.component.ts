import { Component, signal, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { FetchQuestionByIdService } from '../../../services/Question/fetch-question-by-id.service';
import { questionAPIResponse } from '../../../constants/types';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}

@Component({
  selector: 'app-page',
  imports: [HeaderComponent, FormsModule, DatePipe, CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css',
})
export class PageComponent implements OnInit {
  // Component state
  private _quesid = signal('');
  questionData: questionAPIResponse | null = null;
  newComment: string = '';

  // Sample comments data - In a real app, this would come from a service
  comments: Comment[] = [
    {
      id: '1',
      content: 'This is a great question! I learned a lot from it.',
      author: 'John Doe',
      timestamp: new Date('2024-03-15T10:30:00'),
    },
    {
      id: '2',
      content: 'I had a similar question in my interview. Very relevant!',
      author: 'Jane Smith',
      timestamp: new Date('2024-03-16T14:45:00'),
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _getQuestion: FetchQuestionByIdService
  ) {}

  ngOnInit(): void {
    this.initializeQuestionData();
  }

  private initializeQuestionData(): void {
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this._quesid.set(id);
        this.fetchQuestionData();
      } else {
        console.error('Question ID not found in route parameters.');
      }
    });
  }

  private fetchQuestionData(): void {
    this._getQuestion.fetchQuestion(this._quesid()).subscribe({
      next: (question) => {
        if (question.success) {
          this.questionData = question;
        } else {
          console.error('Failed to fetch question:', question.msg);
        }
      },
      error: (error) => {
        console.error('Error fetching question:', error);
      },
    });
  }

  addComment(): void {
    if (this.newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: this.newComment,
        author: 'Current User',
        timestamp: new Date(),
      };
      this.comments.unshift(comment);
      this.newComment = '';
    }
  }
}
