import { Component, Input, ElementRef } from '@angular/core';
import { Pokemon} from '../../shared/interfaces/pokemon';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonStoreServiceService } from '../../core/services/pokemon-store-service.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() pokemon!: Pokemon;


  constructor( private router: Router , private store : PokemonStoreServiceService) { }
 
  public goToDetails() {
    this.store.setPokemon(this.pokemon);
    this.router.navigate(['/pokemon-details']);
  }

}