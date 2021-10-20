import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './component/clientes/clientes.component';
import { NewclienteComponent } from './component/clientes/newcliente/newcliente.component';
import { NewproductoComponent } from './component/productos/newproducto/newproducto.component';
import { ProductosComponent } from './component/productos/productos.component';
import { DetalleventaComponent } from './component/ventas/detalleventa/detalleventa.component';
import { NewventaComponent } from './component/ventas/newventa/newventa.component';
import { VentasComponent } from './component/ventas/ventas.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
  { path: 'clientes', component: ClientesComponent },
  {
    path: 'clientes/add',
    component: NewclienteComponent,
  },
  {
    path: 'clientes/edit/:id',
    component: NewclienteComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'productos/add',
    component: NewproductoComponent,
  },
  {
    path: 'productos/edit/:id',
    component: NewproductoComponent,
  },
  {
    path: 'ventas',
    component: VentasComponent,
  },
  {
    path: 'ventas/add',
    component: NewventaComponent,
  },
  {
    path: 'ventas/edit/:id',
    component: NewventaComponent,
  },
  {
    path: 'ventas/detalle/:id',
    component: DetalleventaComponent,
  },
  {
    path: 'ventas/delete/:id',
    component: DetalleventaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
