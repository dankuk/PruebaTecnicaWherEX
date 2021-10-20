import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { VentasComponent } from '../ventas.component';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css'],
})
export class DetalleventaComponent implements OnInit {
  detalleVenta: any;
  idVenta: any;
  producto: any;
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private opVenta: VentaService,
    private opDetalle: DetalleService,
    private opProducto: ProductoService
  ) {}

  ngOnInit(): void {
    this.idVenta = this.rutaActiva.snapshot.params.id;

    if (this.rutaActiva.snapshot.url[1].path == 'delete' && this.idVenta > 0) {
      // debugger
      this.actualizarNuevoStock(this.idVenta).then(() => {
        /* elimnacion del detalle */
      this.opDetalle.deleteDetalle(this.idVenta).subscribe((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log('detalle eliminado');
        }
      });
      /* elimnacion del detalle */
      this.opVenta.deleteVenta(this.idVenta).subscribe((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log('venta eliminado');
          this.router.navigate(['ventas']);
        }
      });
      });
      
    } else {
      this.findVentaDetalle(this.idVenta);
    }
  }

  async findVentaDetalle(id: number) {
    await this.opVenta.getVentaById(id).subscribe((data) => {
      this.detalleVenta = data;
      console.log(this.detalleVenta);
    });
  }

  async actualizarNuevoStock(idVenta: number) {
    await this.opVenta.getVentaById(idVenta).subscribe((data) => {
      
      console.log(idVenta);
      this.detalleVenta = data;
      console.log(this.detalleVenta);
      debugger;
      let stock = this.detalleVenta[0].cant_producto;
      let cant_venta = this.detalleVenta[0].cant_venta;
      let producto_id = this.detalleVenta[0].producto_id;
      let total = stock + cant_venta;
      debugger;
      this.opProducto
        .verificaStockById(producto_id, total)
        .subscribe((data) => {
          console.log(data);
        });
    });
  }
}
