import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Pokemon } from '../../shared/interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private http: HttpClient) {}


  public listOfPokemons(): Observable<Pokemon[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      switchMap(response => {
        const pokemonRequests = response.results.map((pokemon :any) =>
        this.http.get<any>(pokemon.url).pipe(
          map(details => ({
            name:details.name,
            id: details.id,
            imageUrl : details.sprites.front_default
          }))
        )
      } )
    )
  }
   
}
