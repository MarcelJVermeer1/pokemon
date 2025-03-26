import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
export class CardComponent  implements OnInit {
  @Input() url!: string;

  pokemon!: Pokemon;
  isLoaded = false;

  constructor(private http: HttpClient, private el: ElementRef , private router: Router , private store : PokemonStoreServiceService) { }
 
  public goToDetails() {
    this.store.setPokemon(this.pokemon);
    this.router.navigate(['/pokemon-details']);
  }


  public ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if(entry.isIntersecting && !this.isLoaded) {
        this.fetchDetails();
        observer.disconnect();
      }

    });

    observer.observe(this.el.nativeElement);
  }

  public fetchDetails() {
    this.http.get<any>(this.url).subscribe(data => {
      this.pokemon = {
        id: data.id,
        name: data.name,
        imageUrl: data.sprites.front_default
      };
      this.isLoaded = true;
    });
  }

}