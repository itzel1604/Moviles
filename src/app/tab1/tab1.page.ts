import { Component } from '@angular/core';
import {
  PushNotificationSchema,
  PushNotifications,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/push-notifications';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  ngOnInit(): void {
    //pedir permisos
    PushNotifications.requestPermissions().then(result => {
      if(result.receive === 'granted'){
        //Registrar las notificaciones
        PushNotifications.register();
      } 
      else{
        console.log("Error no tengo permisos");
      }
    });
    
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      alert('El registro fue exitoso, token:' + token.value);
    });

    PushNotifications.addListener('registrationError',(error:any) => {
      alert('Error en el registro' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived',(notification: PushNotificationSchema) => {
      alert('Notificacion recibida:' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed)=> {
      alert('La accion fue ejecutada correctamente' + JSON.stringify(notification));
    });

  }

}
