import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon ,Pokemons} from '../../shared/interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon?'; 

  constructor(private http: HttpClient) { }
  getPokemonList(offset: number = 0, limit: number = 21): Observable<Pokemon[]> {
    return this.http.get<any>(this.baseUrl+`offset=${offset}&limit=${limit}`).pipe(
      map(response => {
        return response.results.map((item: any) => {
          const id = this.extractIdFromUrl(item.url);
          return {
            id: id,
            name: item.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
            url : item.url
          } as Pokemon;
        });
      })
    );
  }
  
  private extractIdFromUrl(url: string): number {
    //spilt the string url to have array of strings
    //then we take the second part of the end that we make the id because it a number.
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);  
  }

  
}