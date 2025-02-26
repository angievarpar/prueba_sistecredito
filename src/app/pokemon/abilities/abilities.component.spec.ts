import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesComponent } from './abilities.component';
import { AbilitiesService } from '../../service/abilities.service';
import { of, throwError } from 'rxjs';
import { AbilityList } from '../../models/ability';

describe('AbilitiesComponent', () => {
  let component: AbilitiesComponent;
  let fixture: ComponentFixture<AbilitiesComponent>;
  let abilitiesServiceSpy: jasmine.SpyObj<AbilitiesService>;

  beforeEach(async () => {
    abilitiesServiceSpy = jasmine.createSpyObj('AbilitiesService', ['getAbilities']);

    await TestBed.configureTestingModule({
      declarations: [AbilitiesComponent],
      providers: [{ provide: AbilitiesService, useValue: abilitiesServiceSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(AbilitiesComponent);
      component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('Debe cargar la lista de habilidades', () => {
    const dummyAbilities: AbilityList = {
      "count": 367,
      "results": [
        {
            "name": "stench",
            "url": "https://pokeapi.co/api/v2/ability/1/"
        },
        {
            "name": "drizzle",
            "url": "https://pokeapi.co/api/v2/ability/2/"
        }
      ]
    };

    abilitiesServiceSpy.getAbilities.and.returnValue(of(dummyAbilities));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.abilities.results.length).toBe(2);
  });

  it('Debe mostrar un mensaje de error si la API falla', () => {
    abilitiesServiceSpy.getAbilities.and.returnValue(throwError(() => new Error('Error de API')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Error al cargar las habilidades');
  });

});
