import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { DetalleService } from 'src/app/services/detalle.service';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  listadoVentas: any;

  constructor(private venta: VentaService, private detalle: DetalleService) { }

  ngOnInit(): void {
    this.getAllVentas();
  }

  async getAllVentas(){
    await this.venta.getVentas().subscribe((result) => {
      if (result.error) {
        console.error('Error en el servicio');
        console.warn(result.message);
      } else {
        console.log(result);
        this.listadoVentas = result;
      }
    });
  }

}
