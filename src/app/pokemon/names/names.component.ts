import { Component, OnInit } from '@angular/core';
import { NamesService } from '../../service/names.service';
import { Router } from '@angular/router';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-names',
  imports: [],
  templateUrl: './names.component.html',
  styleUrl: './names.component.scss'
})
export class NamesComponent implements OnInit {
    names = {};
    loading: boolean = true;
    errorMessage: string = '';
  
    constructor(
      private nameService: NamesService,
      private router: Router) {}
  
    ngOnInit(): void {
      this.getAllPokemons();
    }
  
    getAllPokemons(): void {
      this.nameService.getPokemons().subscribe({
        next: (data) => {
          this.names = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar los pokemones';
          this.loading = false;
          console.error(error);
        }
      });
    }

    goToCreate(): void {
      this.router.navigate(['/pokemon/create']);
    }
}
