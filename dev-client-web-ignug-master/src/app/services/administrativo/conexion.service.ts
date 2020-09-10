import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {formatDate} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  constructor(
    private http: HttpClient
  ) { }

  getPersonaDatos(documento: any) {
    console.log(documento);
    return this.http.post<any>('http://127.0.0.1:8000/api/job_board/compania',
    {
      "user_id": 1,
      "identity": documento.company.identity,
      "nature": documento.company.nature,
      "email": documento.company.email,    
      "trade_name": documento.company.trade_name,
      "comercial_activity": documento.company.comercial_activity,
      "phone": documento.company.phone,
      "cell_phone": documento.company.cell_phone,
      "web_page": documento.company.web_page,
      "address": documento.company.address,
      "state":"ACTIVE",
      "created_at":formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      "updated_at":formatDate(new Date(), 'yyyy/MM/dd', 'en')
    });
  }

  getProfessionalDatos(documento: any) {
    console.log(documento);
    return this.http.post<any>('http://127.0.0.1:8000/api/job_board/professional',
    {
      "user_id": 1,
      "identity": documento.professional.identity,
      "email":  documento.professional.email,
      "first_name":  documento.professional.first_name,    
      "last_name": documento.professional.last_name,
      "nationality":documento.professional.nationality,
      "civil_state": documento.professional.civil_state,
      "birthdate": documento.professional.birthdate,
      "gender": documento.professional.gender,
      "phone": documento.professional.phone,
      "address": documento.professional.address,
      "about_me": "hola mundo",
      "state":"ACTIVE",
      "created_at":formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      "updated_at":formatDate(new Date(), 'yyyy/MM/dd', 'en')
    });
  }
}
