import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompteService, UserData } from '../../services/compte.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';

@Component({
  standalone: true,
  selector: 'app-compte-recap',
  imports: [CommonModule, CapitalizeFirstPipe],
  templateUrl: './compte-recap.component.html',
  styleUrls: ['./compte-recap.component.css'],
})
export class CompteRecapComponent implements OnInit {
  compteData: UserData | null = null;

  constructor(
    private compteService: CompteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger l'utilisateur depuis le localStorage
    this.compteService.loadUserFromLocalStorage();
    this.compteData = this.compteService.getLocalUser();

    // Si aucune donnée locale, récupérer les données depuis le backend
    if (!this.compteData) {
      this.compteService.getUserFromBackend().subscribe({
        next: (user) => {
          this.compteData = user;
          this.compteService.saveUserToLocalStorage(user); // Sauvegarder localement
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données utilisateur :', err);
          // Rediriger vers la connexion en cas d'erreur (ex : token invalide)
          this.router.navigate(['/login']);
        },
      });
    }
  }

  onEditClick(): void {
    this.router.navigate(['/compte-form']); // Rediriger vers le formulaire pour modifier
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']); // Retourner au catalogue
  }
}
