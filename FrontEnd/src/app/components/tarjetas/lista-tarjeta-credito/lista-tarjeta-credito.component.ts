import { TarjetaService } from './../../../services/tarjeta.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetacredito';

@Component({
  selector: 'app-lista-tarjeta-credito',
  templateUrl: './lista-tarjeta-credito.component.html',
  styleUrls: ['./lista-tarjeta-credito.component.css']
})
export class ListaTarjetaCreditoComponent implements OnInit {

  constructor(public tarjetaServices: TarjetaService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.tarjetaServices.obtenerTarjetas();
  }

  eliminarTarjeta(id: number){
    if(confirm('Esta seguro que desea eliminar el registro?')){
      this.tarjetaServices.eliminarTarjeta(id).subscribe(data => {
        this.toastr.warning('Registro eliminado','La tarjeta fue eliminada');
        this.tarjetaServices.obtenerTarjetas();
      });
    }
  }

  editar(tarjeta: TarjetaCredito){
    this.tarjetaServices.actualizar(tarjeta);
  }

}
