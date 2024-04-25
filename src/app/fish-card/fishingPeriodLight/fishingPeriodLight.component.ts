import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Fish } from '../../data/fish.interface';

@Component({
  selector: 'app-fishing-period-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fishingPeriodLight.component.html',
  styleUrl: './fishingPeriodLight.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FishingPeriodLightComponent {
  readonly fish = input.required<Fish>();

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

  canSoonBeFished = computed(() => {
    const { noFishingPeriod } = this.fish();

    if (noFishingPeriod === null) {
      return false; // Can always be fished
    }

    if (noFishingPeriod === 'Ganzjährig') {
      return false; // Can never be fished
    }

    if (this.canBeFished()) {
      return false; // Can now be fished
    }

    return true;
  });

  canNeverBeFished = computed(() => {
    const { noFishingPeriod } = this.fish();

    if (noFishingPeriod === 'Ganzjährig') {
      return true; // Can never be fished
    }

    return false;
  });
}
