import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserData {
  id: number;
  civilite: string;
  nom: string;
  prenom: string;
  adresse: string;
  cp: string;
  ville: string;
  pays: string;
  tel: string;
  email: string;
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompteService {
  private apiUrl = '/api/me';
  private localUser: UserData | null = null;

  constructor(private http: HttpClient) {}

  loadUserFromLocalStorage(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.localUser = JSON.parse(userString);
    }
  }

  saveUserToLocalStorage(user: UserData): void {
    this.localUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLocalUser(): UserData | null {
    return this.localUser;
  }


  fetchUserFromServer(userId: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/${userId}`);
  }

  updateUserOnServer(userId: number, data: Partial<UserData>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, data);
  }
}
