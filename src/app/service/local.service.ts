import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private pokemonSelectKey = 'pokemonSelectKey';
  constructor() { }

  saveUrlPokemonSelect(url: string): void {
    localStorage.setItem(this.pokemonSelectKey, url)
  }

  getUrlPokemonSelect(): string {
    return JSON.parse(localStorage.getItem(this.pokemonSelectKey) || '{}');
  }

  createPokemon(pokemon: Pokemon): void {
    pokemon.id = Math.floor(Math.random() * 20)
    pokemon.base_experience = 1;
    localStorage.setItem(pokemon.id.toString(), JSON.stringify(pokemon));
  }
}
