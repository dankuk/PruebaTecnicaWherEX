import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  endPointUrl: string;
  constructor(private http: HttpClient) {
    this.endPointUrl =
      environment.Servidor + ':' + environment.puerto + environment.ApiVersion;
  }

  getVentas(): Observable<any> {
    console.log(this.endPointUrl + environment.getallventa);
    return this.http.get<any>(this.endPointUrl + environment.getallventa);
  }

  getVentaById(idVenta: number): Observable<any> {
    return this.http.get<any>(
      this.endPointUrl + environment.findventaid + idVenta
    );
  }

  postVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.endPointUrl + environment.newventa, venta);
  }

  editVenta(id: number, venta: any): Observable<any> {
    return this.http.put<any>(
      this.endPointUrl + environment.updateventaid + id,
      venta
    );
  }
}
