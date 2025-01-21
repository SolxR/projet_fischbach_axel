import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface décrivant la structure d'un utilisateur.
 * Adaptez selon votre modèle en base.
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
  // URL principal pour votre backend. 
  // Si vous utilisez un proxy, "/api/auth" pointera vers http://localhost:3000/auth
  private apiUrl = '/api/auth';

  // "Cache" local
  private localUser: UserData | null = null;

  constructor(private http: HttpClient) {}

  /**
   * 1) Charger l'utilisateur stocké dans localStorage et
   *    définir localUser avec cette valeur.
   */
  loadUserFromLocalStorage(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.localUser = JSON.parse(userString);
    }
  }

  /**
   * 2) Récupérer l'utilisateur chargé en mémoire (localUser).
   */
  getLocalUser(): UserData | null {
    return this.localUser;
  }

  /**
   * 3) Sauvegarder un utilisateur en localStorage ET en localUser.
   *    (utile après un login ou une mise à jour en base).
   */
  saveUserToLocalStorage(user: UserData): void {
    this.localUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * 4) Mettre à jour l'utilisateur en base via la route 
   *    PUT /auth/me/:id
   *    data = partiel de UserData (civ, nom, etc.)
   */
  updateUserById(userId: number, data: Partial<UserData>): Observable<any> {
    // => /api/auth/me/1 => via proxy => http://localhost:3000/auth/me/1
    return this.http.put(`${this.apiUrl}/me/${userId}`, data);
  }

  /**
   * (Optionnel) Si vous souhaitez GET un user par ID
   * GET /auth/me/:id 
   */
  getUserById(userId: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/me/${userId}`);
  }
}