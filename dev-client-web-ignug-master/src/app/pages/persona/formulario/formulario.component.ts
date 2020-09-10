import { Component, OnInit } from '@angular/core';
import { Professional } from '../../../models/persona/professional';
import { catalogos } from '../../../models/persona/catalogos';
import { User } from '../../../models/empresa/user';
import { DatePipe } from '@angular/common';
import{ConexionService} from '../../../services/administrativo/conexion.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  professional: Professional;
  nacionalidades: Array<any>;
  password: string;
  passwordConfirmation: string;
  claveValida: boolean;
  claveConfirmacionValida: boolean;
  estadosCiviles: Array<any>;
  sexos: Array<any>;
  fechaNacimientoMaxima: string;
  user: User;
  correoValido: boolean;

  constructor(
    private con: ConexionService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.professional = new Professional();
    this.nacionalidades = catalogos.nacionalidades;
    this.estadosCiviles = catalogos.estadosCiviles;
    this.sexos = catalogos.sexos;
    this.user = new User();
  }

  validarSoloNumeros(cadena) {
    const expreg = /^[0-9]*$/;
    return expreg.test(cadena);
  }

  validarClave(): boolean {
    if (this.passwordConfirmation == null || this.passwordConfirmation.length === 0) {
      if (this.password.length < 6) {
        this.claveValida = false;
      } else {
        this.claveValida = true;
      }
    } else {
      if (this.password === this.passwordConfirmation && this.password.length >= 6) {
        this.claveValida = true;
        this.claveConfirmacionValida = true;
      } else {
        this.claveValida = false;
        this.claveConfirmacionValida = false;
      }
    }
    return this.claveValida;
  }

  validarClaveConfirmacion(): boolean {
    console.log(this.password);
    if (this.password == null || this.password.length === 0) {
      if (this.passwordConfirmation.length < 6) {
        this.claveConfirmacionValida = false;
      } else {
        this.claveConfirmacionValida = true;
      }
    } else {
      if (this.password === this.passwordConfirmation && this.password.length >= 6) {
        this.claveValida = true;
        this.claveConfirmacionValida = true;
      } else {
        this.claveValida = false;
        this.claveConfirmacionValida = false;
      }
    }
    return this.claveConfirmacionValida;
  }

  validarSoloLetrasConEspacio(cadena) {
    const expreg = /^[A-Z_ ]+([A-Z]+)*$/;
    return expreg.test(cadena.toUpperCase());
  }

  validarCorreoElectronico(correoElectronico: string) {
    const expreg = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if (expreg.test(correoElectronico.toLowerCase())) {
      this.correoValido = true;
      return true;
    } else {
      this.correoValido = false;
      return false;
    }

  }

  register() {
    const validacion = this.validarFormulario(this.user);
    if (validacion === '') {
      this.professional.email = this.user.email;
      this.user.name = this.professional.first_name + ' ' + this.professional.last_name;
      this.user.user_name = this.professional.identity;
      this.user.password = this.password;
      const data = {'professional': this.professional, 'user': this.user};
      console.log(data);

      this.con.getProfessionalDatos(data).subscribe(res => {
        console.log(res);
      });

    }
  }

  validarFormulario(dataUser: User): string {
    let errores = '';
    if (this.professional.identity.length !== 10) {
      errores += 'El R.U.C. debe tener 13 dígitos';
    }
    if (this.password.length < 6 || this.passwordConfirmation.length < 6) {
      errores += 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!this.validarCorreoElectronico(dataUser.email)) {
      if (errores.length > 0) {
        errores += ' - ';
      }
      errores += 'Correo electrónico no válido';
    }
    if (this.passwordConfirmation !== this.password) {
      if (errores.length > 0) {
        errores += ' - ';
      }
      errores += 'Las contraseñas no coinciden';
    }
    if (dataUser.email.length > 0) {
      const correo = dataUser.email.split('', 1);
      console.log(correo);
    }
    return errores;
  }

  validarFechaMaximaNacimiento() {
    const fechaActual = new Date();
    fechaActual.setFullYear(fechaActual.getFullYear() - 18);
    this.fechaNacimientoMaxima = this.datePipe.transform(fechaActual, 'yyyy-MM-dd');
  }

}
