import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerComponent {
  close = output();
  imageTitle = input.required<string>();
  imageUrl = input.required<string>();

  onClose(): void {
    this.close.emit();
  }
}
