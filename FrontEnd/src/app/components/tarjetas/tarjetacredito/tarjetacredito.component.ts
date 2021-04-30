import { TarjetaCredito } from './../../../models/tarjetacredito';
import { TarjetaService } from './../../../services/tarjeta.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { iif } from 'rxjs';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjetacredito',
  templateUrl: './tarjetacredito.component.html',
  styleUrls: ['./tarjetacredito.component.css']
})
export class TarjetacreditoComponent implements OnInit {
  form: FormGroup;
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

  ngOnInit(): void {
  }

  guardarTarjeta(){
    const locale = 'en-US';

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
}
