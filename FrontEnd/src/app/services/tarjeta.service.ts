import { TarjetaCredito } from './../models/tarjetacredito';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cliente } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  myAppUrl='https://localhost:44323/';
  myApiUrl='api/TarjetaCredito/';

  myAppUrlCliente='https://localhost:44323/';
  myApiUrlCliente='api/Clientes/';

  list: TarjetaCredito[] | undefined;
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito):Observable<TarjetaCredito>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(tarjeta);
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl,body,httpOptions );
  }

  obtenerTarjetas(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
            .then(data=>{
              this.list = data as TarjetaCredito[];
            })
  }

  eliminarTarjeta(id: number):Observable<TarjetaCredito>{
    return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id);
  }

  actualizar(tarjeta: TarjetaCredito){
    this.actualizarFormulario.next(tarjeta);
  }

  obtenerTarjeta$(): Observable<TarjetaCredito>{
    return this,this.actualizarFormulario.asObservable();
  }

  actualizarTarjeta(id?: number,tarjeta?:TarjetaCredito):Observable<TarjetaCredito>{
    return this.http.put<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id , tarjeta);
  }

  obtenerCliente():Observable<any>{
    return this.http.get<cliente>(this.myAppUrlCliente + this.myApiUrlCliente);
  }
}
