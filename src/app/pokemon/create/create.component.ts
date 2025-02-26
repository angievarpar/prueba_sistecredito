import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NamesService } from '../../service/names.service';
import { Router } from '@angular/router';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-create',
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  pokemonForm: FormGroup;
  pokemonsNames = {};

  constructor(
    private fb: FormBuilder,
    private localService: LocalService,
    private router: Router
  ) {
    this.pokemonForm = this.fb.group({
      pokemonName: ['', Validators.required],
      pokemonOrder: ['', Validators.required],
      pokemonWeight: ['', Validators.required],
      pokemonHeight: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.pokemonForm.valid) {
      this.localService.createPokemon(this.pokemonForm.value);
      this.router.navigate(['/pokemons']);
    } else {
      alert("Todos los campos son requeridos");
    }
  }
}
