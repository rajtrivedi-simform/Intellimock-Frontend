import { Component } from '@angular/core';
import { DemoComponent } from './demo/demo.component';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-demo-ai',
  imports: [DemoComponent, DetailsComponent],
  templateUrl: './demo-ai.component.html',
  styleUrl: './demo-ai.component.css'
})
export class DemoAiComponent {

}
