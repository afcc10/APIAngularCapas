import { TarjetaCredito } from './../../../models/tarjetacredito';
import { TarjetaService } from './../../../services/tarjeta.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { cliente } from 'src/app/models/clientes';


@Component({
  selector: 'app-tarjetacredito',
  templateUrl: './tarjetacredito.component.html',
  styleUrls: ['./tarjetacredito.component.css']
})
export class TarjetacreditoComponent implements OnInit,OnDestroy {
  form: FormGroup;
  suscripction : Subscription | undefined;
  tarjeta:TarjetaCredito | undefined;
  idTarjeta?: number = 0;
  list: cliente[] | undefined;

  constructor(private formBuilder:FormBuilder,private tarjetaService:TarjetaService,
              private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      id:0,
      titular:['',[Validators.required]],
      numeroTarjeta:['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]],
      fecha:['',[Validators.required]],
      estado:['',[Validators.required]]
    })
  }
  ngOnDestroy(): void {
    this.suscripction?.unsubscribe();
  }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjeta$().subscribe(data=>{
      console.log(data);
      this.tarjeta = data;
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv,
        fecha: this.tarjeta.fecha,
        estado: this.tarjeta.estado
      });
      this.idTarjeta = this.tarjeta.id;
    })

    this.tarjetaService.obtenerCliente().subscribe(data=>{
      this.list = data as cliente[];
    });
  }

  guardarTarjeta(){
    const locale = 'en-US';

    if(this.idTarjeta === 0){
      this.agregar();
    }
    else{
      this.editar();
    }

  }

  agregar(){
    const tarjeta:TarjetaCredito={
      titular: this.form.get('titular')!.value,
      numeroTarjeta: this.form.get('numeroTarjeta')!.value,
      fechaExpiracion: this.form.get('fechaExpiracion')!.value,
      cvv: this.form.get('cvv')!.value,
      fecha: new Date(), //this.form.get('fecha')!.value,
      estado:  this.form.get('estado')!.value,
      clienteCedula: ""
    }

    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data=>{
      this.toastr.success('Registro agregado','La tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
    });
  }

  editar(){
    const tarjeta:TarjetaCredito={
      id: this.tarjeta?.id,
      titular: this.form.get('titular')!.value,
      numeroTarjeta: this.form.get('numeroTarjeta')!.value,
      fechaExpiracion: this.form.get('fechaExpiracion')!.value,
      cvv: this.form.get('cvv')!.value,
      fecha: new Date(), //this.form.get('fecha')!.value,
      estado:  this.form.get('estado')!.value,
      clienteCedula: ""
    }
    this.tarjetaService.actualizarTarjeta(this.idTarjeta,tarjeta).subscribe(data =>{
      this.toastr.info('Registro actualizado','La tarjeta fue actualizada');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
      this.idTarjeta = 0;
    })
  }
}
