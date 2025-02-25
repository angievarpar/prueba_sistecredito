import { TestBed } from '@angular/core/testing';
import { NamesService } from './names.service';
import { Pokemon, PokemonList } from '../models/pokemon';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('NamesService', () => {
  let service: NamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NamesService]
    });
    service = TestBed.inject(NamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener una lista de pokemones', () => {
    const dummyPokemons: PokemonList = {
      "count": 1304,
      "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        }
      ]
    };

    service.getPokemons().subscribe(pokemon => {
      expect(pokemon.count).toBe(1304);
      expect(pokemon).toEqual(dummyPokemons);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');

    req.flush(dummyPokemons);
  });

  it('debería manejar errores correctamente', () => {
    const errorMessage = 'Error de conexión';

    service.getPokemons().subscribe({
      next: () => fail('La solicitud debería haber fallado'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(service['apiUrl']);
    req.error(new ErrorEvent('Network error'), { status: 500, statusText: errorMessage });
  });

  it('debería obtener el detalle de un pokemon', () => {
    const dummyUrl: string = "";
    const dummyPokemon: Pokemon = {
      "abilities": [
          {
              "ability": {
                  "name": "shield-dust",
                  "url": "https://pokeapi.co/api/v2/ability/19/"
              },
              "is_hidden": false
          },
          {
              "ability": {
                  "name": "run-away",
                  "url": "https://pokeapi.co/api/v2/ability/50/"
              },
              "is_hidden": true
          }
      ],
      "base_experience": 39,
      "height": 3,
      "id": 10,
      "name": "caterpie",
      "order": 14,
      "weight": 29
  };

    service.getDetailPokemon(dummyUrl).subscribe(pokemon => {
      expect(pokemon.id).toBe(10);
      expect(pokemon).toEqual(dummyPokemon);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');

    req.flush(dummyPokemon);
  });

});
