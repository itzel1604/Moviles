import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ComprasService } from '../servicios/compras.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public crearProductoForm: FormGroup

  constructor(
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    private servicio: ComprasService,
    formBuider: FormBuilder,
    private router: Router
  ) {
    this.crearProductoForm = formBuider.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      descuento: ['', Validators.required],
      imagen: ['', Validators.required]
    })
  }

  async crearProducto(){
    const loading = await this.loadingCtrl.create();

    const titulo = this.crearProductoForm.value.titulo;
    const descripcion = this.crearProductoForm.value.descripcion;
    const precio = this.crearProductoForm.value.precio;
    const descuento = this.crearProductoForm.value.descuento;
    const imagenes = [this.crearProductoForm.value.imagen];

    this.servicio.crearProducto(titulo, descripcion, precio, descuento, imagenes)
    .then(
      ()=> {
        loading.dismiss().then(()=> {
          this.router.navigateByUrl('');
        });
      },
      error =>{
        loading.dismiss().then(()=>{
          console.log(error);
        })
      }
    )
    return loading.present();
  }

}
