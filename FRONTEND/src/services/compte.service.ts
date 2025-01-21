import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface décrivant la structure d'un utilisateur.
 */
export interface UserData {
  id?: number;
  civilite?: string;
  nom?: string;
  prenom: string;
  adresse?: string;
  cp?: string;
  ville?: string;
  pays?: string;
  tel?: string;
  email?: string;
  login?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompteService {
  private apiUrl = '/api/auth'; // URL principal pour le backend
  private localUser: UserData | null = null; // Cache local

  constructor(private http: HttpClient) {}

  /**
   * Charger l'utilisateur depuis le localStorage.
   * Si le localStorage ne contient pas d'utilisateur ou contient une valeur invalide,
   * on ne fait rien.
   */
  loadUserFromLocalStorage(): void {
    const userString = localStorage.getItem('user');
    console.log('Contenu brut du localStorage (clé "user") :', userString); // <-- Ajout du log
  
    if (userString) {
      try {
        this.localUser = JSON.parse(userString);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur dans localStorage :', error);
        this.localUser = null; // Réinitialiser en cas d'erreur
      }
    } else {
      console.warn('Aucune donnée utilisateur trouvée dans localStorage.');
      this.localUser = null;
    }
  }

  /**
   * Retourner les données utilisateur chargées en mémoire (localUser).
   */
  getLocalUser(): UserData | null {
    return this.localUser;
  }

  /**
   * Sauvegarder un utilisateur en localStorage ET en localUser.
   */
  saveUserToLocalStorage(user: UserData): void {
    this.localUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Récupérer les informations utilisateur depuis le backend via GET /auth/me.
   */
  getUserFromBackend(): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/me`);
  }

  /**
   * Mettre à jour un utilisateur en base via PUT /auth/me/:id.
   */
  updateUserById(userId: number, data: Partial<UserData>): Observable<any> {
    const token = localStorage.getItem('token'); // Récupère le token JWT depuis le localStorage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajoute le token dans le header Authorization
    });

    return this.http.put(`${this.apiUrl}/me/${userId}`, data, { headers });
  }
}
