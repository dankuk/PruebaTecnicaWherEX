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

  getDetalleById(cliente_id: number): Observable<any> {
    return this.http.get<any>(
      this.endPointUrl + environment.finddetalleid + cliente_id
    );
  }

  postDetalle(cliente: any): Observable<any> {
    return this.http.post<any>(
      this.endPointUrl + environment.newdetalle,
      cliente
    );
  }

  editDetalle(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(
      this.endPointUrl + environment.updatedetalleid + id,
      cliente
    );
  }
}
