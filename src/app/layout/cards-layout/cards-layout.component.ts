import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemons} from '../../shared/interfaces/pokemon';
import { PokemonService } from '../../core/services/pokemon.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards-layout',
  standalone: true,
  imports: [NgFor,CardComponent,CommonModule],
  templateUrl: './cards-layout.component.html',
  styleUrl: './cards-layout.component.scss'
})
export class CardsLayoutComponent  implements OnInit{


  pokemons: Pokemons[] = [];
  currentPage = 0;
  pageSize = 21;

  constructor(private pokemonService: PokemonService) { }

  public ngOnInit() {
    this.loadPage(this.currentPage);
  }

  public loadPage(page: number ) {
    const offset = page * this.pageSize;

    this.pokemonService.getPokemonList(offset, this.pageSize).subscribe(pokemons => {
      this.pokemons = pokemons;
      this.currentPage = page;
    }
    );
  }

  public nextPage() {
    this.loadPage(this.currentPage + 1);
  }

  public prevPage() {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }

}
