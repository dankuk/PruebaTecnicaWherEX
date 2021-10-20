import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/services/cliente-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-newcliente',
  templateUrl: './newcliente.component.html',
  styleUrls: ['./newcliente.component.css'],
})
export class NewclienteComponent implements OnInit {
  onlyText = '[a-zA-Z ]{2,254}';
  uploadForm: FormGroup;
  id: number;
  isAddMode: boolean;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private clientes: ClienteService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params.id;
    this.isAddMode = !this.id;

    this.uploadForm = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(this.onlyText),
        ],
      ],
      estado: [''],
    });
    if (!this.isAddMode) {
      this.clientes
        .getClientesById(this.id)
        .pipe(first())
        .subscribe((x) => {
          console.log(x);
          this.uploadForm.patchValue({
            nombre: x[0].nombre,
            estado: x[0].estado,
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
        let newCliente = {
          nombre: postForm.nombre,
          estado: 1,
        };
        this.clientes.postCliente(newCliente).subscribe((data) => {
          if (data.error) {
            console.error('error en servicio');
          } else {
            console.log(data);
            this.router.navigate(['clientes']);
          }
        });
        console.log(newCliente);
      } else {
        alert('Datos incorrectos o no completos');
      }
    } else {
      //actualizar
      if (this.uploadForm.valid) {
        let postForm = this.uploadForm.value;
        let nombreCompleto = postForm.nombre;
        let newCliente = {
          nombre: nombreCompleto,
          estado: postForm.estado,
        };
        this.clientes.editCliente(this.id, newCliente).subscribe((data) => {
          if (data.error) {
            console.error('error en servicio');
          } else {
            console.log(data);
            this.router.navigate(['clientes']);
          }
        });
        console.log(newCliente);
      } else {
        alert('Datos incorrectos o no completos');
      }
    }
  }

  get f() {
    return this.uploadForm.controls;
  }
}
