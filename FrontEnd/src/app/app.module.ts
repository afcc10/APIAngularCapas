import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { TarjetacreditoComponent } from './components/tarjetas/tarjetacredito/tarjetacredito.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetasComponent,
    TarjetacreditoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
