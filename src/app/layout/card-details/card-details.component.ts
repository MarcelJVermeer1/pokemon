import { Component } from '@angular/core';
import { Pokemon } from '../../shared/interfaces/pokemon';
import { PokemonStoreServiceService } from '../../core/services/pokemon-store-service.service';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  pokemon!: Pokemon | null;

  constructor(private store: PokemonStoreServiceService) {}

  ngOnInit() {
    this.store.getPokemon().subscribe(p => {
      console.log(p);
      this.pokemon = p;
    });
  }
}
