import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../../../services/common/loader.service';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {
    // Subscribe to the loader's visibility state
    this.loaderService.isLoading$.subscribe((status) => {
      this.isLoading = status;
      // When loader is hidden, reset progress
    });
  }
}
