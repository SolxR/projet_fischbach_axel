import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = '/api/auth';
  private localUser: UserData | null = null;

  constructor(private http: HttpClient) {}

  loadUserFromLocalStorage(): void {
    const userString = localStorage.getItem('user');
  
    if (userString) {
      try {
        this.localUser = JSON.parse(userString);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur dans localStorage :', error);
        this.localUser = null;
      }
    } else {
      console.warn('Aucune donnée utilisateur trouvée dans localStorage.');
      this.localUser = null;
    }
  }

  getLocalUser(): UserData | null {
    return this.localUser;
  }

  saveUserToLocalStorage(user: UserData): void {
    this.localUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromBackend(): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/me`);
  }

  updateUserById(userId: number, data: Partial<UserData>): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/me/${userId}`, data, { headers });
  }
}
