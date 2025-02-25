import { Component, Input, OnInit } from '@angular/core';
import { PokemonItem } from '../../models/pokemon';
import { NamesService } from '../../service/names.service';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  @Input() pokemonItem!: PokemonItem;
  detail = {};
  errorMessage: string = '';

  constructor(private nameService: NamesService) { }

  ngOnInit(): void {
    this.getDetail(this.pokemonItem.url);
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
}
