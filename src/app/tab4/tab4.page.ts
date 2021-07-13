import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor( public alertController: AlertController ) { }

  ngOnInit() {
  }

  async presentarAlert(){
    const alert = await this.alertController.create({
      header:"Titulo del alert",
      subHeader:"Subtitulo",
      message:"Hellooooo",
      inputs:[
        {
          name: 'usuario',
          type:'text',
          placeholder: 'Nombre de usuario'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingresa contraseña',
          attributes:{
            maxLength: 10,
            minLength: 4,
            inputMode: "decimal"
          }
        }
      ],
      buttons: [
      {
        text: 'cancelar',
        role:'cancel',
        cssClass:'secondary',
        handler:(parametro) => {
          console.log('Se presiono boton cancelar')
        }
      },
      {
        text: 'Aceptar',
        role:'acept',
        cssClass:'primary',
        handler:() => {
          console.log('Haz aceptado vender tu alma')
        }
      } 
      ]
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
    console.log('El evento cerrar fue resuelto por el evento role:', role)

  }

  onClick(){
    alert("Hola word");
  }

}
