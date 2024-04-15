import { Component, NgModuleRef } from '@angular/core';
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
  filteredFishes = fishes;

  filterValue = '';

  onInput(val: string): void {
    const valCleaned = val.toLowerCase().trim();
    this.filteredFishes = this.fishes.filter((f) =>
      f.name.toLowerCase().includes(valCleaned)
    );
  }
}
