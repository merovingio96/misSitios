import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs';
//import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ListadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class ListadoPage {

  sitios: any;

  constructor(
  	public navCtrl: NavController,
    public modalCtrl: ModalController,
  	public navParams: NavParams,
    public alertCtrl: AlertController,
    public dbFirebase: FirebaseDbProvider,
    public auth: AuthServiceProvider,
    public afDB: AngularFireDatabase) {
  	//public dbprovider: DbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoPage');
  }

  ionViewDidEnter() {
    this.dbFirebase.getSitios().subscribe(sitios => {
      this.sitios = sitios;
    });
  }

  //Se mostrará una nueva ventana con los detalles del sitio (listado.html)
  muestraSitio(sitio) {
    let modalSitio = this.modalCtrl.create('ModalDetalleSitioPage', sitio);
    modalSitio.present();
  }

  //Borrar sitio de la lista de sitios haciendo uso del provider FirebaseDbProvider
  borrarSitio(id) {
    let alert = this.alertCtrl.create( {
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar este sitio?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
            //Aquí borramos el sitio en Firebase
            this.dbFirebase.borrarSitio(id);
          }
        }
      ]
    });

    alert.present(); //Para mostrar la alerta y se ejecute la funcionalidad
  }

}
