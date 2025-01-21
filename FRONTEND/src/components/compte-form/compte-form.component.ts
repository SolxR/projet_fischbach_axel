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
  compteForm!: FormGroup;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private compteService: CompteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.compteService.loadUserFromLocalStorage();
    const localUser = this.compteService.getLocalUser();
    if (localUser) {
      this.userId = localUser.id ?? null;
      this.compteForm.patchValue(localUser);
    }
  }

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
      login: ['', Validators.required],
      password: [''],
    });
  }

  onSubmit(): void {
    if (this.compteForm.valid && this.userId) {
      const data = this.compteForm.value;

      this.compteService.updateUserOnServer(this.userId, data).subscribe({
        next: () => {
          const updatedUser: UserData = { id: this.userId, ...data };
          this.compteService.saveUserToLocalStorage(updatedUser);

          this.router.navigate(['/compte-recap']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour', err);
        },
      });
    }
  }
}
