import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  /**
   * Méthode pour déconnecter l'utilisateur
   */
  onLogout(): void {
    // Supprimer le token et les données utilisateur du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Rediriger vers la page de connexion
    this.router.navigate(['/']);
  }
}
