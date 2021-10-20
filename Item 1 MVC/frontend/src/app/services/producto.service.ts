import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  endPointUrl: string;
  constructor(private http: HttpClient) {
    this.endPointUrl =
      environment.Servidor + ':' + environment.puerto + environment.ApiVersion;
  }

  getProductos(): Observable<any> {
    console.log(this.endPointUrl + environment.getallproducto);
    return this.http.get<any>(this.endPointUrl + environment.getallproducto);
  }

  getProductosVenta(): Observable<any> {
    console.log(this.endPointUrl + environment.getproductoventa);
    return this.http.get<any>(this.endPointUrl + environment.getproductoventa);
  }

  getProductoById(producto_id: number): Observable<any> {
    return this.http.get<any>(
      this.endPointUrl + environment.findproductoid + producto_id
    );
  }

  verificaStockById(producto_id: number, total: number): Observable<any> {
    return this.http.get<any>(
      this.endPointUrl + environment.verificastockbyid + producto_id + "/" + total
    );
  }

  postProducto(producto: any): Observable<any> {
    return this.http.post<any>(
      this.endPointUrl + environment.newproducto,
      producto
    );
  }

  editProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(
      this.endPointUrl + environment.updateproductoid + id,
      producto
    );
  }
  downCantProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(
      this.endPointUrl + environment.downCantProducto + id,
      producto
    );
  }
}
