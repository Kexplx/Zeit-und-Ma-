import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  SecurityContext,
  computed,
  input,
} from '@angular/core';
import { Fish } from '../data/fish.interface';
import { FishingPeriodLightComponent } from './fishingPeriodLight/fishingPeriodLight.component';
import { ImageViewerComponent } from '../../image-viewer/image-viewer.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fish-card',
  standalone: true,
  imports: [CommonModule, FishingPeriodLightComponent, ImageViewerComponent],
  templateUrl: './fish-card.component.html',
  styleUrl: './fish-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FishCardComponent {
  fish = input.required<Fish>();

  minSize = computed(() => {
    const { minSizeInCm } = this.fish();
    return minSizeInCm === null ? 'Keines' : `${minSizeInCm} cm`;
  });

  noFishingPeriod = computed(() => {
    const { noFishingPeriod } = this.fish();
    return noFishingPeriod === null ? 'Keine' : noFishingPeriod;
  });

  catchmentAreas = computed(() => {
    const { catchmentAreas } = this.fish();
    return catchmentAreas.join(', ');
  });

  canBeFished = computed(() => {
    const { noFishingPeriod } = this.fish();

    if (noFishingPeriod === null) {
      return true; // Can always be fished
    }

    if (noFishingPeriod === 'Ganzjährig') {
      return false; // Can never be fished
    }

    // Parse the date range
    const months = {
      Januar: 0,
      Februar: 1,
      März: 2,
      April: 3,
      Mai: 4,
      Juni: 5,
      Juli: 6,
      August: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Dezember: 11,
    };
    const [start, end] = noFishingPeriod.split(' - ');
    const [startDay, startMonth] = start.split(' ');
    const [endDay, endMonth] = end.split(' ');

    const currentYear = new Date().getFullYear();

    const startDate = new Date(
      currentYear,
      months[startMonth as keyof typeof months],
      parseInt(startDay),
    );
    const endDate = new Date(
      currentYear,
      months[endMonth as keyof typeof months],
      parseInt(endDay),
    );

    endDate.setHours(23, 59, 59, 999);

    // Adjust for year crossover (e.g., December to February)
    if (endDate < startDate) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const currentDate = new Date();

    // Check if current date is within the no fishing period
    return !(currentDate >= startDate && currentDate <= endDate);
  });

  hasImage = computed(() => {
    const { imageUrl } = this.fish();

    return !!imageUrl;
  });

  imageUrl = computed(() => {
    const { imageUrl: dirtyUrl } = this.fish();

    if (dirtyUrl === null) {
      return '';
    }
    const cleanUrl = this.urlSantitizer.sanitize(
      SecurityContext.URL,
      this.urlSantitizer.bypassSecurityTrustUrl(dirtyUrl),
    );

    return cleanUrl!;
  });

  isImageViewerOpen = false;

  constructor(private urlSantitizer: DomSanitizer) {}
}
