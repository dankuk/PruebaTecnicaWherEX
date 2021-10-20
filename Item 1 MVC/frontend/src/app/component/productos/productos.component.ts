import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  listadoProductos: any;

  constructor(private productos: ProductoService) { }

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos(){
    this.productos.getProductos().subscribe((result) => {
      if (result.error) {
        console.error('Error en el servicio');
        console.warn(result.message);
      } else {
        console.log(result);
        this.listadoProductos = result;
      }
    });
  }

}
