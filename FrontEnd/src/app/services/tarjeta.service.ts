import { TarjetaCredito } from './../models/tarjetacredito';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  myAppUrl='https://localhost:44323/';
  myApiUrl='api/TarjetaCredito';
  list: TarjetaCredito[] | undefined;

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito):Observable<TarjetaCredito>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(tarjeta);
    console.log(body)
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl,body,httpOptions );
  }

  obtenerTarjetas(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
            .then(data=>{
              this.list = data as TarjetaCredito[];
            })
  }

}
