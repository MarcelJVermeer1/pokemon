import { Routes } from '@angular/router';
import { CardDetailsComponent } from './layout/card-details/card-details.component';
import { CardsLayoutComponent } from './layout/cards-layout/cards-layout.component';

export const routes: Routes = [
    {
      path: '',
      component: CardsLayoutComponent 
    },
    {
      path: 'pokemon-details',
      component: CardDetailsComponent
    }
  ];
