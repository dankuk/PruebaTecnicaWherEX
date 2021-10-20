import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ClienteService } from 'src/app/services/cliente-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-newventa',
  templateUrl: './newventa.component.html',
  styleUrls: ['./newventa.component.css'],
})
export class NewventaComponent implements OnInit {
  onlyNumber = '^[0-9]*$';
  onlyText = '[a-zA-Z ]{2,254}';
  uploadForm: FormGroup;
  id: number;
  isAddMode: boolean;
  submitted: boolean = false;
  listProductosVenta: any;
  listClienteVenta: any;
  subtotal: number = 0;
  total: number = 0;
  precioProducto: any;
  descuento = 0;
  iva = 19;

  public idVenta: any;
  cantProductosVendidos: any;
  cantProductosVendidosCopia: any;
  stockProductosCopia: any;
  stockProductos: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private ventas: VentaService,
    private detalles: DetalleService,
    private clientes: ClienteService,
    private productos: ProductoService
  ) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params.id;
    this.isAddMode = !this.id;

    this.uploadForm = this.formBuilder.group({
      nombreproducto: ['', Validators.required],
      nombrecliente: ['', Validators.required],
      iva: [
        19,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(this.onlyNumber),
        ],
      ],
      descuento: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(this.onlyNumber),
        ],
      ],
      total: [''],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(this.onlyNumber),
        ],
      ],
      subtotal: [''],
    });
    if (!this.isAddMode) {
      this.ventas
        .getVentaById(this.id)
        .pipe(first())
        .subscribe((x) => {
          console.log(x);
          this.precioProducto = x[0].precio_producto;
          this.stockProductos = x[0].cant_producto;
          this.stockProductosCopia = this.stockProductos;
          this.descuento = x[0].descuento;
          this.iva = x[0].iva;
          this.cantProductosVendidos = x[0].cant_venta;
          this.cantProductosVendidosCopia = x[0].cant_venta;
          this.uploadForm.patchValue({
            nombreproducto: x[0].producto_id,
            nombrecliente: x[0].cliente_id,
            iva: x[0].iva,
            descuento: x[0].descuento,
            cantidad: this.cantProductosVendidos,
            total: x[0].total,
            subtotal: x[0].subtotal,
          });
          this.calcularTotales(
            this.cantProductosVendidos,
            this.iva,
            this.descuento
          );
        });
    }
    if (this.isAddMode) {
      this.productos.getProductosVenta().subscribe((data) => {
        this.listProductosVenta = data;
        console.log(this.listProductosVenta);
      });
      this.clientes.getClientesVenta().subscribe((data) => {
        this.listClienteVenta = data;
        console.log(this.listClienteVenta);
      });
    } else {
      this.productos.getProductos().subscribe((data) => {
        this.listProductosVenta = data;
        console.log(this.listProductosVenta);
      });
      this.clientes.getClientes().subscribe((data) => {
        this.listClienteVenta = data;
        console.log(this.listClienteVenta);
      });
    }
  }

  onKeyPressCantidad(event: any) {
    if (event.key !== 'Delete' && event.key !== 'Backspace') {
      debugger;
      if (this.isAddMode) {
        if (event.target.value > 0) {
          if (event.target.value <= this.stockProductosCopia) {
            this.cantProductosVendidos = event.target.value;
            this.stockProductos = this.stockProductosCopia - this.cantProductosVendidos;
            this.calcularTotales(
              this.cantProductosVendidos,
              this.iva,
              this.descuento
            );
          } else {
            alert('Excede la cantidad de stock disponible');
            this.cantProductosVendidos = this.stockProductosCopia;
            this.stockProductos = 0;
            this.uploadForm.patchValue({
              cantidad: this.stockProductosCopia,
            });
          }
        }
      } else {
        

        if (event.target.value > 0) {
          let stockTotalModificacion =
            this.cantProductosVendidosCopia + this.stockProductosCopia;
          let delta = this.cantProductosVendidosCopia - event.target.value;
          let aux = this.stockProductosCopia + delta;
          if (0 <= aux && aux <= stockTotalModificacion) {
            this.stockProductos = aux;
            this.calcularTotales(event.target.value, this.iva, this.descuento);
          } else {
            alert(
              'Excede la cantidad de stock disponible para esta modificación'
            );
            this.cantProductosVendidos = this.stockProductos;
            this.uploadForm.patchValue({
              cantidad: this.stockProductos,
            });
            this.calcularTotales(
              this.cantProductosVendidos,
              this.iva,
              this.descuento
            );
          }
        } else {
          alert('No puede establecer valor 0 en cantidad');
          if(this.stockProductos > 0){
            this.cantProductosVendidos = this.stockProductos;
            this.uploadForm.patchValue({
              cantidad: this.stockProductos,
            });
          }else if(this.stockProductos <= 0){
            this.uploadForm.patchValue({
              cantidad: this.cantProductosVendidosCopia,
            });
          }        
          
          this.calcularTotales(
            this.cantProductosVendidos,
            this.iva,
            this.descuento
          );
        }
      }
      console.log(event);
    }
  }

  onKeyPressIva(event: any) {
    if (event.target.value >= 0 && event.target.value <= 100) {
      if (event.target.value > 0) {
        this.iva = event.target.value;
      } else {
        this.iva = 0;
      }
      this.calcularTotales(
        this.cantProductosVendidos,
        this.iva,
        this.descuento
      );
    }
  }

  onKeyPressDescuento(event: any) {
    if (event.target.value >= 0 && event.target.value <= 100) {
      this.descuento = event.target.value;
      this.calcularTotales(
        this.cantProductosVendidos,
        this.iva,
        this.descuento
      );
    }
  }

  calcularTotales(
    cantProductosVendidos: number,
    iva: number,
    descuento: number
  ) {
    this.subtotal = cantProductosVendidos * this.precioProducto;
    descuento = 1 - descuento / 100;
    iva = 1 + iva / 100;
    this.total = Math.round(this.subtotal * descuento * iva);
    this.uploadForm.patchValue({
      subtotal: this.subtotal,
      total: this.total,
    });
  }

  selectProducto(event: any) {
    this.productos.getProductoById(event.target.value).subscribe((data) => {
      this.stockProductos = data[0].cantidad;
      this.stockProductosCopia = data[0].cantidad;
      this.precioProducto = data[0].precio;
    });
    this.subtotal = 0;
    this.total = 0;
  }

  onSubmit() {
    this.submitted = true;
    if (this.isAddMode) {
      if (this.uploadForm.valid) {
        let postForm = this.uploadForm.value;
        let newVenta = {
          fecha: this.getFecha(),
          iva: postForm.iva,
          descuento: postForm.descuento,
          total: postForm.total,
        };
        this.ventas.postVenta(newVenta).subscribe((data) => {
          if (data.error) {
            console.error('error en servicio');
          } else {
            let newDetalle = {
              venta_id: parseInt(data.data),
              cliente_id: parseInt(postForm.nombrecliente),
              producto_id: parseInt(postForm.nombreproducto),
              cantidad: postForm.cantidad,
              subtotal: postForm.subtotal,
            };
            console.log(newDetalle);
            this.detalles.postDetalle(newDetalle).subscribe((data) => {
              if (data.error) {
                console.error('error en servicio');
              } else {
                debugger;
                let saldo = this.stockProductosCopia - postForm.cantidad;
                this.productos.downCantProducto(parseInt(postForm.nombreproducto), { cantidad: saldo })
                  .subscribe((data) => {
                    if (data.error) {
                      console.error('error en servicio');
                    } else {
                      console.log(data);
                    }
                    this.router.navigate(['ventas']);
                  });
              }
            });
          }
        });
      } else {
        alert('Datos incorrectos o no completos');
      }
    } else {
      //actualizar
      if (this.uploadForm.valid) {
        let postForm = this.uploadForm.value;
        let newVenta = {
          fecha: this.getFecha(),
          iva: postForm.iva,
          descuento: postForm.descuento,
          total: postForm.total,
        };
        this.ventas.editVenta(this.id, newVenta).subscribe((data) => {
          if (data.error) {
            console.error('error en servicio');
          } else {
            console.log(data);
          }
        });
        let newDetalle = {
          cliente_id: postForm.nombrecliente,
          producto_id: postForm.nombreproducto,
          cantidad: postForm.cantidad,
          subtotal: postForm.subtotal,
        };
        console.log(newDetalle);
        this.detalles.editDetalle(this.id, newDetalle).subscribe((data) => {
          if (data.error) {
            console.error('error en servicio');
          } else {
            console.log(this.cantProductosVendidos);
            let saldo;
            if (this.stockProductos > 0) {
              let delta = this.cantProductosVendidos - postForm.cantidad;
              saldo = this.stockProductosCopia + delta;
            } else if (this.stockProductos == 0) {
              saldo = 0;
            }

            this.productos
              .downCantProducto(parseInt(postForm.nombreproducto), {
                cantidad: saldo,
              })
              .subscribe((data) => {
                if (data.error) {
                  console.error('error en servicio');
                } else {
                  console.log(data);
                }
                this.router.navigate(['ventas']);
              });
          }
        });
      } else {
        alert('Datos incorrectos o no completos');
      }
    }
  }

  getFecha() {
    let date_ob = new Date();
    let date = ('0' + date_ob.getDate()).slice(-2);
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let fechaUpdate =
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds;
    return fechaUpdate;
  }

  get f() {
    return this.uploadForm.controls;
  }
}
