import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent implements OnInit, OnDestroy {
  close = output();
  imageTitle = input.required<string>();
  imageUrl = input.required<string>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.close.emit();
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'inherit';
  }

  onClose(): void {
    this.close.emit();
  }
}
