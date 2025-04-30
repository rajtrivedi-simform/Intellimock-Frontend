import { Component } from '@angular/core';
import { HeaderComponent } from '../../../common/header/header.component';
import { QuestionComponent } from './question/question.component';
import { EditorComponent } from './editor/editor.component';

@Component({
  selector: 'app-code-interview-page',
  imports: [HeaderComponent, QuestionComponent, EditorComponent],
  templateUrl: './code-interview-page.component.html',
  styleUrl: './code-interview-page.component.css',
})
export class CodeInterviewPageComponent {}
