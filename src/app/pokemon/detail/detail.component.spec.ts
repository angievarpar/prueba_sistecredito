import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { Pokemon } from '../../models/pokemon';
import { NamesService } from '../../service/names.service';
import { of } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let namesServiceSpy: jasmine.SpyObj<NamesService>;

  beforeEach(async () => {
    namesServiceSpy = jasmine.createSpyObj('NamesService', ['getDetailPokemon']);

    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [{ provide: NamesService, useValue: namesServiceSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;

    component.pokemonItem = {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar el detalle del pokemon', () => {
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
  
      namesServiceSpy.getDetailPokemon.and.returnValue(of(dummyPokemon));
  
      component.ngOnInit();
      fixture.detectChanges();
  
      expect(component.detail.id).toBe(10);
    });
});
