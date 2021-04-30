import { TarjetaService } from './../../../services/tarjeta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-tarjeta-credito',
  templateUrl: './lista-tarjeta-credito.component.html',
  styleUrls: ['./lista-tarjeta-credito.component.css']
})
export class ListaTarjetaCreditoComponent implements OnInit {

  constructor(public tarjetaServices: TarjetaService) { }

  ngOnInit(): void {
    this.tarjetaServices.obtenerTarjetas();
  }

}
