import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonRoutingModule } from './person-routing.module';
import { FormComponent } from './form/form.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    FormsModule,
  ],
  providers: [DatePipe]
})
export class PersonModule { }
