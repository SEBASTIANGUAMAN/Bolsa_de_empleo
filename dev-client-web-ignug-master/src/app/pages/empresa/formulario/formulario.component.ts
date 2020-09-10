import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/empresa/company';
import { User } from '../../../models/empresa/user';
import{ConexionService} from '../../../services/administrativo/conexion.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  company: Company;
  password: string;
  passwordConfirmation: string;
  claveValida: boolean;
  claveConfirmacionValida: boolean;
  user: User;
  correoValido: boolean;
  paginaWebValida: boolean;

  constructor( 
    private con: ConexionService,
  ) { }

  ngOnInit(): void {
    this.company = new Company();
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

  validarPaginaWeb(paginaWeb: string) {

    const expreg = /^[_a-z0-9-]+(.[_a-z0-9-]+)+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if (expreg.test(paginaWeb.toLowerCase())) {
      this.paginaWebValida = true;
      return true;
    } else {
      this.paginaWebValida = false;
      return false;
    }

  }

  register() {
    const validacion = this.validarFormulario(this.user);
    if (validacion === '') {
      this.company.trade_name = this.company.trade_name.toUpperCase();
      this.company.comercial_activity = this.company.comercial_activity.toUpperCase();
      this.company.email = this.user.email.toLowerCase();
      if (this.company.web_page.length !== 0) {
        this.company.web_page = this.company.web_page.toLowerCase();
      }
      this.company.address = this.company.address.toUpperCase();
      this.user.name = this.company.trade_name;
      this.user.user_name = this.company.identity;
      this.user.password = this.password;
      const data = {'company': this.company, 'user': this.user};
      console.log(data);

      this.con.getPersonaDatos(data).subscribe(res => {
        console.log(res);
      });
    }
  }

  validarFormulario(dataUser: User): string {
    let errores = '';
    if (this.company.identity.length !== 13) {
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

}

