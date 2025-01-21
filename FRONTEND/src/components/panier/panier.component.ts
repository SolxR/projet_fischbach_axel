import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { CartState, CartItem, RemoveFromCart, DecrementQuantity } from '../../store/cart.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RoundPipe } from '../../pipes/round.pipe';

@Component({
  standalone: true,
  selector: 'app-panier',
  imports: [CommonModule, RoundPipe],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  items$!: Observable<CartItem[]>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.items$ = this.store.select(CartState.getItems);
  }

  removeItem(productId: number): void {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  decrementQuantity(productId: number): void {
    this.store.dispatch(new DecrementQuantity(productId));
  }

  goToPayment(): void {
    this.router.navigate(['/paiement']);
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
