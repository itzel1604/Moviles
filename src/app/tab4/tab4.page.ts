import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public numero: string = '';
  public mes: string = '';
  public anio: string = '';
  public cvv: string= '';
  public titular: string = '';
  credencialesTarjeta: any = {};

  constructor( 
    public alertController: AlertController,
    public stripe: Stripe
     ) { }

  ngOnInit() {
  }

  separarNumero(){
    let nuevoNumero = this.numero.toString().replace(/\d{4}(?=.)/g,'$& ');
    return nuevoNumero;
  }

  pagarConStripe(){
    this.stripe.setPublishableKey(environment.stripeKey);

    this.credencialesTarjeta = {
      number: this.numero,
      expMonth: this.mes,
      expYear: this.anio,
      cvc: this.cvv
    }

    this.stripe.createCardToken(this.credencialesTarjeta)
    .then(token => {
      console.log(token);

      //mandar el token al servidor
    })
    .catch(error => {
      console.log(error);
    })
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
