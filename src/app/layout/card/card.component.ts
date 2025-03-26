import { Component, Input } from '@angular/core';
import { Pokemon } from '../../shared/interfaces/pokemon';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LowerCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() pokemon!: Pokemon;

}
