import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
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
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          alert('Compte créé avec succès. Veuillez vous connecter.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur lors de la création du compte :', err);
        },
      });
    } else {
      alert('Veuillez remplir correctement tous les champs du formulaire.');
    }
  }
}
