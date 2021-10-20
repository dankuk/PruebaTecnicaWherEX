import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {
  endPointUrl: string;
  constructor(private http: HttpClient) {
    this.endPointUrl =
      environment.Servidor + ':' + environment.puerto + environment.ApiVersion;
  }

  getDetalles(): Observable<any> {
    return this.http.get<any>(this.endPointUrl + environment.getalldetalle);
  }

  getDetalleById(detalle_id: number): Observable<any> {
    return this.http.get<any>(
      this.endPointUrl + environment.finddetalleid + detalle_id
    );
  }

  getDetalleByVentaId(detalle_id: number): Observable<any> {
    return this.http.get<any>(
      this.endPointUrl + environment.finddetalleventaid + detalle_id
    );
  }

  deleteDetalle(detalle_id: number): Observable<any> {
    return this.http.delete<any>(
      this.endPointUrl + environment.deletedetalleid + detalle_id
    );
  }

  

  postDetalle(detalle: any): Observable<any> {
    return this.http.post<any>(
      this.endPointUrl + environment.newdetalle,
      detalle
    );
  }

  editDetalle(id: number, detalle: any): Observable<any> {
    return this.http.put<any>(
      this.endPointUrl + environment.updatedetalleid + id,
      detalle
    );
  }
}
