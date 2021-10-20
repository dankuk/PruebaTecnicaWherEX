// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  puerto : 8080,
  Servidor : "http://localhost",
  ApiVersion: "/api/v1/",
  //Clientes
  getclienteventa: "getclienteventa/",
  getallcliente: "getallcliente/",
  newcliente: "newcliente/",
  findclienteid: "findclienteid/",
  updateclienteid: "updateclienteid/",
  deleteclienteid: "deleteclienteid/",
  //Productos
  verificastockbyid: "verificastockbyid/",
  getallproducto: "getallproducto/",
  getproductoventa: "getProductos/",
  newproducto: "newproducto/",
  findproductoid: "findproductoid/",
  updateproductoid: "updateproductoid/",
  downCantProducto: "downCantProducto/",
  deleteproductoid: "deleteproductoid/",
  //ventas
  getallventa: "getallventa/",
  newventa: "newventa/",
  findventaid: "findventaid/",
  updateventaid: "updateventaid/",
  deleteventaid: "deleteventaid/",
  //detalle ventas
  getalldetalle: "getalldetalle/",
  newdetalle: "newdetalle/",
  finddetalleid: "finddetalleid/",
  finddetalleventaid: "finddetalleventaid/",
  updatedetalleid: "updatedetalleid/",
  deletedetalleid: "deletedetalleid/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
