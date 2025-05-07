import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  code: string = '// Write your code here...';
  selectedLanguage: string = 'javascript';

  languages = ['javascript', 'python', 'java', 'c++'];
}
