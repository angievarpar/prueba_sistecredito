import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { LocalService } from '../../service/local.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let localServiceSpy: jasmine.SpyObj<LocalService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    localServiceSpy = jasmine.createSpyObj('LocalService', ['createPokemon']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CreateComponent],
      providers: [
        FormBuilder,
        { provide: LocalService, useValue: localServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario correctamente', () => {
    expect(component.pokemonForm).toBeDefined();
    expect(component.pokemonForm.controls['pokemonName']).toBeDefined();
    expect(component.pokemonForm.controls['pokemonOrder']).toBeDefined();
    expect(component.pokemonForm.controls['pokemonWeight']).toBeDefined();
    expect(component.pokemonForm.controls['pokemonHeight']).toBeDefined();
  });

  it('Debe llamar a createPokemon y navegar al enviar el formulario', () => {
    component.pokemonForm.setValue({
      pokemonName: 'beedrill',
      pokemonOrder: 19,
      pokemonWeight: 10,
      pokemonHeight: 295
    });

    component.onSubmit();

    expect(localServiceSpy.createPokemon).toHaveBeenCalledWith(component.pokemonForm.value);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokemons']);
  });

  it('Debe mostrar una alerta si el formulario es inválido', () => {
    spyOn(window, 'alert');

    component.pokemonForm.setValue({
      eventName: '',
      eventDate: '',
      eventLocation: '',
      assignedUser: ''
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Todos los campos son requeridos');
  });
});
