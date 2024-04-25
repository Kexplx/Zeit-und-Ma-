import { AfterViewInit, Component, ElementRef, NgModuleRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fishes } from './data/fishes';
import { FishCardComponent } from './fish-card/fish-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FishCardComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly fishes = fishes;
  filteredFishes = this.fishes;

  filterValue = '';

  onInput(val: string): void {
    val = val.trim();

    if (val === '') {
      this.filteredFishes = [...this.fishes];
      return;
    }

    if (val.endsWith(' ')) {
      return;
    }

    const cleanFn = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replaceAll('ä', 'ae')
        .replaceAll('ö', 'oe')
        .replaceAll('ü', 'ue')
        .replaceAll('ß', 'ss');

    // Split the cleaned input into an array of search terms
    const searchTerms = val.split(/\s+/).map(term => cleanFn(term));

    this.filteredFishes = this.fishes.filter(fish =>
      // Check if any of the search terms is included in the fish's name
      searchTerms.some(term => cleanFn(fish.name).includes(term)),
    );
  }
}
