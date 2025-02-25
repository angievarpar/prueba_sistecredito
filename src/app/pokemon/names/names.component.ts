import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { NamesService } from '../../service/names.service';

@Component({
  selector: 'app-names',
  imports: [],
  templateUrl: './names.component.html',
  styleUrl: './names.component.scss'
})
export class NamesComponent implements OnInit {
    names: Pokemon[] = [];
    loading: boolean = true;
    errorMessage: string = '';
  
    constructor(private nameService: NamesService) {}
  
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
          this.errorMessage = 'Error al cargar los usuarios';
          this.loading = false;
          console.error(error);
        }
      });
    }
}
