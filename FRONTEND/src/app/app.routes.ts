import { Routes } from '@angular/router';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { CompteFormComponent } from '../components/compte-form/compte-form.component';
import { CompteRecapComponent } from '../components/compte-recap/compte-recap.component';
import { PanierComponent } from '../components/panier/panier.component';
import { PaiementComponent } from '../components/paiement/paiement.component';
import { LoginComponent } from '../components/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'compte-form', component: CompteFormComponent },
  { path: 'compte-recap', component: CompteRecapComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'paiement', component: PaiementComponent },
  { path: '**', redirectTo: '' }
];
