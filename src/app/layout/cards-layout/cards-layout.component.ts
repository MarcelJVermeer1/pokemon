import { CommonModule, NgFor } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Pokemon} from '../../shared/interfaces/pokemon';
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


  pokemons: Pokemon[] = [];
  currentPage = 0;
  pageSize = 0;

  constructor(private pokemonService: PokemonService) { }
  
  public ngOnInit() {
    this.loadPage(this.currentPage);
  }

  public loadPage(page: number ) {
    const offset = page * this.pageSize;
    this.pageSize = this.getResponsivePageSize();
    //get the pokemon list from the service and subscribe to it.
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

  //D etermines the page size based on the window width.
  private getResponsivePageSize(): number {
    const width = window.innerWidth;
    if (width >= 1600) return 21;
    if (width >= 1024) return 18; 
    if (width >= 768) return 12;
    return 9;                    
  }
  @HostListener('window:resize')
onResize() {
  this.loadPage(this.currentPage); 
}


}
