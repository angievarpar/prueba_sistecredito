import { TestBed } from '@angular/core/testing';

import { AbilitiesService } from './abilities.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AbilityList } from '../models/ability';

describe('AbilitiesService', () => {
  let service: AbilitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AbilitiesService]
    });
    service = TestBed.inject(AbilitiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener una lista de habilidades', () => {
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
  
      service.getAbilities().subscribe(ability => {
        expect(ability.count).toBe(367);
        expect(ability).toEqual(dummyAbilities);
      });
  
      const req = httpMock.expectOne(service['apiUrl']);
      expect(req.request.method).toBe('GET');
  
      req.flush(dummyAbilities);
    });
  
    it('debería manejar errores correctamente', () => {
      const errorMessage = 'Error de conexión';
  
      service.getAbilities().subscribe({
        next: () => fail('La solicitud debería haber fallado'),
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });
  
      const req = httpMock.expectOne(service['apiUrl']);
      req.error(new ErrorEvent('Network error'), { status: 500, statusText: errorMessage });
    });
  

});
