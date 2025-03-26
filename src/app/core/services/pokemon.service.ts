import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon ,Pokemons} from '../../shared/interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=21'; 

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 21): Observable<Pokemons[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(map(res => res.results as Pokemons[]));
  }
  


  public listOfPokemon(offset: number = 0, limit: number = 21): Observable<Pokemon[]> {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  
    return this.http.get<any>(url).pipe(
      switchMap(response => {
        const requests: Observable<Pokemon>[] = response.results.map((pokemon: any) =>
          this.http.get<any>(pokemon.url).pipe(
            map(details => ({
              name: details.name,
              id: details.id,
              imageUrl: details.sprites.front_default
            } as Pokemon))
          )
        );
        return forkJoin(requests);
      })
    );
  }

  
}