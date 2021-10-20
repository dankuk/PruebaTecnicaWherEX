import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cliente } from 'src/app/model/cliente.model';
import { ProductoService } from 'src/app/services/producto.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-newproducto',
  templateUrl: './newproducto.component.html',
  styleUrls: ['./newproducto.component.css'],
})
export class NewproductoComponent implements OnInit {
  onlyNumber = '^[0-9]*$';
  onlyText = '[a-zA-Z ]{2,254}';
  uploadForm: FormGroup;
  id: number;
  isAddMode: boolean;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private productos: ProductoService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params.id;
    this.isAddMode = !this.id;

    this.uploadForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.onlyText)]],
      cantidad: [1, [Validators.required, Validators.pattern(this.onlyNumber)]],
      precio: ['', [Validators.required, Validators.pattern(this.onlyNumber)]],
    });
    if (!this.isAddMode) {
      this.productos
        .getProductoById(this.id)
        .pipe(first())
        .subscribe((x) => {
          console.log(x);
          this.uploadForm.patchValue({
            nombre: x[0].nombre,
            precio: x[0].precio,
            cantidad: x[0].cantidad,
          });
        });
    }
  }

  onSubmit() {
    debugger;
    this.submitted = true;

    // this.loading = true;
    if (this.isAddMode) {
      if (this.uploadForm.valid) {
        let postForm = this.uploadForm.value;
        let newProducto = {
          nombre: postForm.nombre,
          cantidad: postForm.cantidad,
          precio: postForm.precio,
        };
        this.productos.postProducto(newProducto).subscribe((data) => {
          if (data.error) {
            console.error('error en servicio');
          } else {
            console.log(data);
            this.router.navigate(['productos']);
          }
        });
        console.log(newProducto);
      } else {
        alert('Datos incorrectos o no completos');
      }
    } else {
      //actualizar
      if (this.uploadForm.valid) {
        let postForm = this.uploadForm.value;
        let nombreCompleto = postForm.nombre;
        let newProducto = {
          nombre: postForm.nombre,
          cantidad: postForm.cantidad,
          precio: postForm.precio,
        };
        this.productos.editProducto(this.id, newProducto).subscribe((data) => {
          if (data.error) {
            console.error('error en servicio');
          } else {
            console.log(data);
            this.router.navigate(['productos']);
          }
        });
        console.log(newProducto);
      } else {
        alert('Datos incorrectos o no completos');
      }
    }
  }

  get f() {
    return this.uploadForm.controls;
  }
}
