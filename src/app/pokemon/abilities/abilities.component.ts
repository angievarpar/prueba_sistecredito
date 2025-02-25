import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbilitiesService } from '../../service/abilities.service';

@Component({
  selector: 'app-abilities',
  imports: [],
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.scss'
})
export class AbilitiesComponent {
  abilities = {};
  loading: boolean = true;
  errorMessage: string = "";

  constructor(private abilitiesService: AbilitiesService) {}

  ngOnInit(): void {
    this.getAllAbilities();
  }

  getAllAbilities(): void {
    this.abilitiesService.getAbilities().subscribe({
      next: (data) => {
        this.abilities = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los pokemones';
        this.loading = false;
        console.error(error);
      }
    });
  }
}
