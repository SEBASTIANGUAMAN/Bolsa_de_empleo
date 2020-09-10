import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonaRoutingModule } from './persona-routing.module';
import { FormularioComponent } from './formulario/formulario.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [FormularioComponent],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    FormsModule,
    DatePipe,
  ]
})
export class PersonaModule { }
