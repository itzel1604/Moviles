import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public numero: string = '5252525252525252';
  public mes: string = '04';
  public anio: string = '2022';
  public cvv: string= '123';
  public titular: string = 'Itzel García';
  credencialesTarjeta: any = {};
  deshabilitarBoton: boolean = false;
  public loading;

  constructor( 
    public alertController: AlertController,
    public stripe: Stripe,
    public loadingController: LoadingController
     ) { }

  ngOnInit() {
    this.loading = this.loadingController.create({
      message: "Espere por favor..."
    })
  }

  separarNumero(){
    let nuevoNumero = this.numero.toString().replace(/\d{4}(?=.)/g,'$& ');
    return nuevoNumero;
  }

  async presentLoading(){
    this.loading = await this.loadingController.create({
      message: "Espere por favor..."
    })
    await this.loading.present();
  }

  async dismissLoading(){
    await this.loading.dismiss()
  }

  pagarConStripe(){
    this.deshabilitarBoton = true;

    this.stripe.setPublishableKey(environment.stripeKey);

    this.credencialesTarjeta = {
      number: this.numero,
      expMonth: this.mes,
      expYear: this.anio,
      cvc: this.cvv
    }

    this.stripe.createCardToken(this.credencialesTarjeta)
    .then(token => {
      console.log(JSON.stringify(token));
      this.presentarAlert("ok", `Token: ${token.id}`)
      //mandar el token al servidor
    })
    .catch(error => {
      this.presentarAlert("Error", error);
      console.log(JSON.stringify(error));
    })
    .finally(() => {
      this.dismissLoading();
      this.deshabilitarBoton = false
    });
  }

  async presentarAlert(encabezado: string, mensaje: string){
    const alert = await this.alertController.create({
      header: encabezado,
      subHeader:mensaje,
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
