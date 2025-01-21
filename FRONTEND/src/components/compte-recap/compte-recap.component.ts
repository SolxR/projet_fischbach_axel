import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompteService, UserData } from '../../services/compte.service';
import { CapitalizeFirstPipe } from '../../pipes/capitalize-first.pipe';

@Component({
  standalone: true,
  selector: 'app-compte-recap',
  imports: [CommonModule, CapitalizeFirstPipe],
  templateUrl: './compte-recap.component.html',
  styleUrls: ['./compte-recap.component.css'],
})
export class CompteRecapComponent implements OnInit {
  compteData: UserData | null = null;

  constructor(
    private compteService: CompteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.compteService.loadUserFromLocalStorage();
    this.compteData = this.compteService.getLocalUser();
  }

  onEditClick(): void {
    this.router.navigate(['/compte-form']);
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
