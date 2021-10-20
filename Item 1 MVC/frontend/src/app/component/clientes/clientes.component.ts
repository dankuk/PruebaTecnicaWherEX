import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/model/cliente.model';
import { ClienteService } from 'src/app/services/cliente-service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  listadoClientes: any;
  newClienteShowForm: boolean = false;

  constructor(private clientes: ClienteService) {}

  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes(){
    this.clientes.getClientes().subscribe((result) => {
      if (result.error) {
        console.error('Error en el servicio');
        console.warn(result.message);
      } else {
        console.log(result);
        this.listadoClientes = result;
      }
    });
  }

  showFormNewCliente() {
    if (this.newClienteShowForm) {
      this.newClienteShowForm = false;
    } else {
      this.newClienteShowForm = true;
    }
    this.getAllClientes();
  }
}
