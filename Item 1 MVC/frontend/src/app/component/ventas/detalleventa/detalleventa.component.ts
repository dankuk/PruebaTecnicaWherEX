import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { DetalleService } from 'src/app/services/detalle.service';

@Component({
  selector: 'app-detalleventa',
  templateUrl: './detalleventa.component.html',
  styleUrls: ['./detalleventa.component.css'],
})
export class DetalleventaComponent implements OnInit {
  detalleVenta: any;
  idVenta: any;
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private opVenta: VentaService,
    private opDetalle: DetalleService
  ) {}

  ngOnInit(): void {
    this.idVenta = this.rutaActiva.snapshot.params.id;
    this.findVentaDetalle(this.idVenta);
  }

  findVentaDetalle(id: number){
    this.opVenta.getVentaById(id).subscribe((data) => {
      this.detalleVenta = data;
      console.log(this.detalleVenta);
    })

  }

}
