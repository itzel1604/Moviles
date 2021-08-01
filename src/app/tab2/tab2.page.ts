import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../servicios/compras.service';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
public listaProductos: Observable<Producto[]>

  constructor( 
    private servicio: ComprasService, 
    private alertController: AlertController,
    private router: Router
    ) {}

ngOnInit(): void {
  this.listaProductos = this.servicio.obtenerProductos();
}

async eliminarProducto(id: string, titulo:string){
  const alert = await this.alertController.create({
    message: `Está seguro de eliminar el producto: ${titulo}`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: cancelar => {
          console.log('se presiono el bóton cancelar');
        }
      },
      {
        text: 'Confirmar',
        handler: () =>{
          this.servicio.eliminarProducto(id).then(() => {
            console.log(id);
            this.router.navigateByUrl('');
          })
        }
      }
    ]
  });

  await alert.present();

}

}
