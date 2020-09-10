import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { FormularioComponent } from './formulario/formulario.component';


@NgModule({
  declarations: [FormularioComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule,
  ]
})
export class EmpresaModule { }
