import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonItem } from '../../models/pokemon';
import { NamesService } from '../../service/names.service';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  @Input() pokemonItem!: PokemonItem;
  @Output() pokemonDeleted = new EventEmitter<string>();
  
  detail = {};
  errorMessage: string = '';
  pokemonUrl: string = '';

  constructor(private nameService: NamesService, private localService: LocalService) { }

  ngOnInit(): void {
    this.pokemonUrl = this.localService.getUrlPokemonSelect(); 
    this.getDetail(this.pokemonUrl);
  }

  getDetail(url: string): void {
    this.nameService.getDetailPokemon(url).subscribe({
      next: (data) => {
        this.detail = data;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el detalle del pokemon';
        console.error(error);
      }
    });
  }

  deleteEvent(): void {
    this.pokemonDeleted.emit(this.pokemonItem.name);
  }
}
