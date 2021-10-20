import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  listadoCliente: any;
  endPointUrl: string;

  listadoClientes: any;

  constructor(private http: HttpClient) {
    this.endPointUrl =
      environment.Servidor + ':' + environment.puerto + environment.ApiVersion;
  }

  ngOnInit(): void {}

  getClientes(): Observable<any> {
    return this.http.get<any>(this.endPointUrl + environment.getallcliente);
  }

  getClientesVenta(): Observable<any> {
    return this.http.get<any>(this.endPointUrl + environment.getclienteventa);
  }

  getClientesById(cliente_id: number): Observable<any> {
    return this.http.get<any>(
      this.endPointUrl + environment.findclienteid + cliente_id
    );
  }

  postCliente(cliente: any): Observable<any> {
    return this.http.post<any>(
      this.endPointUrl + environment.newcliente,
      cliente
    );
  }

  editCliente(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(
      this.endPointUrl + environment.updateclienteid + id,
      cliente
    );
  }
}
