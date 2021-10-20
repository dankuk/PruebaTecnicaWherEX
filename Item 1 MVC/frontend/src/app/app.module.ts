import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './component/clientes/clientes.component';
import { ProductosComponent } from './component/productos/productos.component';
import { VentasComponent } from './component/ventas/ventas.component';
import { NewclienteComponent } from './component/clientes/newcliente/newcliente.component';
import { ClienteService } from './services/cliente-service.service';
import { HttpClientModule } from "@angular/common/http";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { NewproductoComponent } from './component/productos/newproducto/newproducto.component';
import { NewventaComponent } from './component/ventas/newventa/newventa.component';
import { DetalleventaComponent } from './component/ventas/detalleventa/detalleventa.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ProductosComponent,
    VentasComponent,
    NewclienteComponent,
    FooterComponent,
    NavigationComponent,
    SkeletonComponent,
    NewproductoComponent,
    NewventaComponent,
    DetalleventaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
