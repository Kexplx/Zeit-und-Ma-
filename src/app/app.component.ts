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
export class AppComponent implements AfterViewInit {
  @ViewChild('filterInputRef') filterInputRef?: ElementRef<HTMLInputElement>;

  readonly fishes = fishes;
  filteredFishes = this.fishes;

  filterValue = '';

  ngAfterViewInit(): void {
    this.filterInputRef?.nativeElement.focus();
  }

  onInput(val: string): void {
    const cleanFn = (s: string) =>
      s
        .toLowerCase()
        .trim()
        .replaceAll('ä', 'ae')
        .replaceAll('ö', 'oe')
        .replaceAll('ü', 'ue')
        .replaceAll('ß', 'ss');
    const valCleaned = cleanFn(val);
    this.filteredFishes = this.fishes.filter(f => cleanFn(f.name).includes(valCleaned));
  }
}
