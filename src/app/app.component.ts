import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) {
    console.log('Routes:', this.router.config);
  }
  
  public goToHome(){
    this.router.navigate(['/']);
  }

}
 