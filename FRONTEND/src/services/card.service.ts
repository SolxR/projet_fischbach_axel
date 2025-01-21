import { Injectable, Signal, signal } from '@angular/core';

export interface Card {
  id: number;
  nomCarte: string;
  codeCarte: string;
  ccv: string;
  dateExpiration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards = signal<Card[]>([]);

  getCards(): Signal<Card[]> {
    return this.cards;
  }

  addCard(card: Card): void {
    this.cards.update(cards => [...cards, card]);
  }

  removeCard(cardId: number): void {
    this.cards.update(cards => cards.filter(card => card.id !== cardId));
  }

  updateCard(cardId: number, updatedCard: Card): void {
    this.cards.update(cards =>
      cards.map(card => (card.id === cardId ? { ...updatedCard } : card))
    );
  }

  getCardById(cardId: number): Card | undefined {
    return this.cards().find(card => card.id === cardId);
  }
}
