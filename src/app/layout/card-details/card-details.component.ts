import { Component } from '@angular/core';
import { Pokemon, PokemonDetails } from '../../shared/interfaces/pokemon';
import { PokemonStoreServiceService } from '../../core/services/pokemon-store-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [NgIf, NgFor,NgStyle],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  basicPokemon!: Pokemon;
  pokemonDetails!: PokemonDetails;
  evolutionFailed = false;

  // Define the colors for each type
  // This is a simple mapping of type names to colors to apply to the background.
  typeColors: { [key: string]: string } = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0'
  };


  constructor(
    private store: PokemonStoreServiceService,
    private http: HttpClient,
    private router: Router
  ) {}

  public ngOnInit() {
    // Fetch the selected Pokémon from the store service
    this.store.getPokemon().subscribe((p) => {
      if (p) {
        this.basicPokemon = p;
        this.fetchDetails(p.url);
      } else {
        alert('Geen Pokémon geselecteerd!');
        this.router.navigate(['/']);
      }
    });
  }

  public fetchDetails(url: string) {
    this.http.get<PokemonDetails>(url).subscribe({
      //next is used to make sure that if there is nothing in the pipe we can give error
      next: (data) => {
          // Sort hidden ability first
          data.abilities.sort((a, b) => {
            if (a.is_hidden === b.is_hidden) return 0;
            return a.is_hidden ? -1 : 1; // hidden = first
          });

          // Assign image and data
          data.imageUrl = data.sprites.back_shiny;
          this.pokemonDetails = data;
              },
      error: () => {
        alert('Deze Pokémon bestaat niet.');
        this.router.navigate(['/']);
      }
    });
  }


  goToEvolution() {
    this.evolutionFailed = false;
    //get the eveolution chain url from the species url
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${this.basicPokemon.id}/`).subscribe(species => {
      const evoUrl = species.evolution_chain.url;
  
      //get the evolution chain from the url
      //then we get the next evolution from the chain
      //then we navigate to the next evolution
      //then we get the id from the species url
      //then we fetch the details from the next evolution
      this.http.get<any>(evoUrl).subscribe(chain => {
        const currentName = this.basicPokemon.name;
        const next = this.findNextEvolution(chain.chain, currentName);
  
        if (next) {
          // Navigate with animation to the evolved Pokémon
          const evolvedName = next.species.name;
  
          // Show animation before navigating
          this.playEvolutionAnimation(() => {
            this.router.navigate(['/pokemon-details']);
            const nextId = this.getIdFromSpeciesUrl(next.species.url);
            this.fetchDetails(`https://pokeapi.co/api/v2/pokemon/${nextId}/`);
            this.basicPokemon = {
              id: nextId,
              name: evolvedName,
              url: `https://pokeapi.co/api/v2/pokemon/${nextId}/`,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextId}.png`
            };
          });
        } else {
          // No evolution found, play fail animation
          this.playFailAnimation();
        }
      });
    });
  }
  
  findNextEvolution(chain: any, currentName: string): any {
    // Check if the current chain matches the current Pokémon name
    if (chain.species.name === currentName && chain.evolves_to.length > 0) {
      return chain.evolves_to[0];
    }
    // If not, recursively check the next evolutions
    // If the current chain doesn't match, check the next evolutions

    for (let next of chain.evolves_to) {
      const result = this.findNextEvolution(next, currentName);
      if (result) return result;
    }
  
    return null;
  }
  
  getIdFromSpeciesUrl(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  }
  
  playEvolutionAnimation(callback: () => void) {
    console.log("✨ Evolution animation...");
    setTimeout(() => callback(), 1200); 
  }
  
  playFailAnimation() {
    this.evolutionFailed = true;
  }
}
