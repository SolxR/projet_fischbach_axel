import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompteService } from '../../services/compte.service';

@Component({
  standalone: true,
  selector: 'app-compte-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.css'],
})
export class CompteFormComponent implements OnInit {
  compteForm!: FormGroup;
  userId: number | null = null;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private compteService: CompteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (localUser && localUser.id) {
      this.userId = localUser.id;
      this.compteForm.patchValue(localUser);
    }
  }

  private initForm(): void {
    this.compteForm = this.fb.group({
      civilite: ['M', Validators.required],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      adresse: ['', [Validators.required, Validators.maxLength(100)]],
      cp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      ville: ['', [Validators.required, Validators.maxLength(50)]],
      pays: ['', [Validators.required, Validators.maxLength(50)]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  onSubmit(): void {
    if (this.compteForm.valid && this.userId) {
      const data = this.compteForm.value;
      this.compteService.updateUserById(this.userId, data).subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.successMessage = 'Votre compte a été mis à jour avec succès !';
          this.router.navigate(['/compte-recap']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l’utilisateur :', err);
          alert('Une erreur est survenue. Veuillez réessayer.');
        },
      });
    } else {
      alert('Veuillez remplir correctement tous les champs du formulaire.');
    }
  }
}
