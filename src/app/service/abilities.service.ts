import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AbilityList } from '../models/ability';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {

  private apiUrl = 'https://pokeapi.co/api/v2/ability';
  
  constructor(private http: HttpClient) {}

  getAbilities(): Observable<AbilityList> {
    return this.http.get<AbilityList>(this.apiUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
