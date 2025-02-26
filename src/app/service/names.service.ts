import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon, PokemonList } from '../models/pokemon';
import { randomUUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.apiUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getDetailPokemon(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(
      catchError((error) => {
        return throwError(() => new Error('Error al obtener el pokemon'));
      })
    );
  }

}
