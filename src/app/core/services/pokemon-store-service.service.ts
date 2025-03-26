import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../../shared/interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonStoreServiceService {
  private selectedPokemon = new BehaviorSubject<Pokemon | null>(null);
  

  public setPokemon(pokemon: Pokemon) {
    this.selectedPokemon.next(pokemon);
  }

  public getPokemon(): Observable<Pokemon | null> {
    return this.selectedPokemon.asObservable();
  }
  
}
