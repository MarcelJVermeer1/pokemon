import { Component } from '@angular/core';
import { Pokemon } from './shared/interfaces/pokemon'; 
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './core/services/pokemon.service';
import { NgFor } from '@angular/common';
import { CardComponent } from './layout/card/card.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor ,CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  pokemons: Pokemon[] = [];
  currentPage = 0;
  pageSize = 21;
  cache = new Map<number, Pokemon[]>();

  constructor(private pokemonService: PokemonService) { }

  public ngOnInit() {
    this.loadPokemons(this.currentPage);
  }

  public loadPokemons(page: number ) {
    const offset = page * this.pageSize;

    if (this.cache.has(page)) {
      this.pokemons = this.cache.get(page)!;
      this.currentPage = page;
      return;
    }

    this.pokemonService.listOfPokemon(offset, this.pageSize).subscribe(data => {
      this.cache.set(page, data);
      this.pokemons = data;
      this.currentPage = page;
    });
  }

  public nextPage() {
    this.loadPokemons(this.currentPage + 1);
  }

  public prevPage() {
    if (this.currentPage > 0) {
      this.loadPokemons(this.currentPage - 1);
    }
  }

}
 