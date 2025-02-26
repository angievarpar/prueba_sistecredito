import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesComponent } from './names.component';
import { NamesService } from '../../service/names.service';
import { PokemonList } from '../../models/pokemon';
import { of, throwError } from 'rxjs';

describe('NamesComponent', () => {
  let component: NamesComponent;
  let fixture: ComponentFixture<NamesComponent>;
  let namesServiceSpy: jasmine.SpyObj<NamesService>;

  beforeEach(async () => {
    namesServiceSpy = jasmine.createSpyObj('NamesService', ['getPokemons']);

    await TestBed.configureTestingModule({
      declarations: [NamesComponent],
      providers: [{ provide: NamesService, useValue: namesServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Debe cargar la lista de pokemones', () => {
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

    namesServiceSpy.getPokemons.and.returnValue(of(dummyPokemons));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.names.results.length).toBe(2);
  });

  it('Debe mostrar un mensaje de error si la API falla', () => {
    namesServiceSpy.getPokemons.and.returnValue(throwError(() => new Error('Error de API')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Error al cargar los pokemones');
  });
});
