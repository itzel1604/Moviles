import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor( public firestore: AngularFirestore ) { }

  obtenerProductos(): Observable<Producto[]>{
    return this.firestore.collection<Producto>(`ListaProductos`).valueChanges();
  }

  crearProducto(
    titulo: string,
    descripcion: string,
    precio: number,
    descuento: number,
    imagenes: string[],
  ): Promise<void>
  {
    const id = this.firestore.createId();
    return this.firestore.doc(`ListaProductos/${id}`).set({
      id,
      titulo,
      descripcion,
      precio,
      descuento,
      imagenes
    });
  }

  eliminarProducto(id: string):Promise<void>{
    return this.firestore.doc(`ListaProductos/${id}`).delete();
  }

}
