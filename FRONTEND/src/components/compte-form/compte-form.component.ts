import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService, UserData } from '../../services/compte.service';

@Component({
  standalone: true,
  selector: 'app-compte-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.css'],
})
export class CompteFormComponent implements OnInit {
  // Le FormGroup pour les champs
  compteForm!: FormGroup;

  // Identifiant de l’utilisateur. On suppose qu’on l’a stocké dans user.id
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private compteService: CompteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Crée le FormGroup et définit les validators
    this.initForm();

    // Charger l'utilisateur depuis le localStorage
    this.compteService.loadUserFromLocalStorage();

    // Récupérer l'utilisateur local
    const localUser = this.compteService.getLocalUser();
    if (localUser && localUser.id) {
      // On récupère son ID
      this.userId = localUser.id;

      // Pré-remplir le formulaire
      this.compteForm.patchValue(localUser);
    }
  }

  /**
   * Initialise le formulaire réactif avec les champs nécessaires.
   */
  private initForm(): void {
    this.compteForm = this.fb.group({
      civilite: ['M', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      cp: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required], // Le champ "login" est requis
    });
  }

  /**
   * Au clic sur "Valider" (ngSubmit), on envoie la mise à jour vers le backend.
   */
  onSubmit(): void {
    if (this.compteForm.valid && this.userId) {
      const data = this.compteForm.value; // Les champs du formulaire

      // Appeler la méthode du service pour mettre à jour les données
      this.compteService.updateUserById(this.userId, data).subscribe({
        next: (res) => {
          // Sauvegarder les données utilisateur mises à jour dans le localStorage
          localStorage.setItem('user', JSON.stringify(res.user));

          // Rediriger vers la page récapitulatif
          this.router.navigate(['/compte-recap']);
        },
        error: (err) => {
          console.error('Erreur mise à jour user :', err);
        },
      });
    }
  }
}
