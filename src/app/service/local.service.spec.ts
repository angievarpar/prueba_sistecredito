import { TestBed } from '@angular/core/testing';
import { LocalService } from './local.service';
import { Pokemon } from '../models/pokemon';


describe('LocalService', () => {
  let service: LocalService;
  
  const mockUrl: string = "https://pokeapi.co/api/v2/pokemon/15";

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalService);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'pokemonSelectKey' ? JSON.stringify(mockUrl) : null;
    });

    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('Debe obtener la url', () => {
    const url = service.getUrlPokemonSelect();
    expect(url).toBeDefined();
    expect(url).toBe(mockUrl);
  });

  it('Debe crear un nuevo pokemon', () => {
    const newpokemon: Pokemon = {
      id: 20,
      name: 'beedrill',
      order: 19,
      weight: 295,
      height: 10,
      base_experience: 10,
      abilities: []
  }

    service.createPokemon(newpokemon);

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
