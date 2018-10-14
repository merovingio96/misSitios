import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { GoogleDataProvider } from '../../providers/google-data/google-data';
//import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ModalNuevoSitioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-modal-nuevo-sitio',
  templateUrl: 'modal-nuevo-sitio.html',
})
export class ModalNuevoSitioPage {

  siteData: any;
  coords: any = { lat: 0, lng: 0 };
  description: string = '';
  photo: any = '';

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	//private dbprovider: DbProvider,
    private dbFirebase: FirebaseDbProvider,
    private googleData: GoogleDataProvider,
  	private viewCtrl: ViewController,
  	private camera: Camera) {
  }

  //Función que accede de manera nativa a la cámara del dispositivo para tomar una foto
  sacarFoto() {
  	let cameraOptions = {
  		quality: 50,
  		encodingType: this.camera.EncodingType.JPEG,
  		targetWidth: 800,
  		targetHeight: 600,
  		destinationType: this.camera.DestinationType.DATA_URL,
  		sourceType: this.camera.PictureSourceType.CAMERA,
  		correctOrientation: true
  	}

  	this.camera.getPicture(cameraOptions).then((imageData) => {
  		//imageData is a base64 encoded string
  		this.photo = "data:image/jpeg;base64," + imageData;
  	}, (err) => {
  		console.log(err);
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNuevoSitioPage');
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng'); 
    
    this.googleData.getRemoteData(this.coords.lat, this.coords.lng).subscribe((res) => {
      this.siteData = res['results']['0']['formatted_address'];
    }, (error) => {
      console.error(error);
    });
  }

  guardarSitio() {
    let sitio = {
      lat: this.coords.lat,
      lng: this.coords.lng,
      address: this.siteData,
      description: this.description,
      photo: this.photo
    }

    this.dbFirebase.guardarSitio(sitio)
    .then(res => {
      console.log('¡Sitio guardado en Firebase!');
      this.closeModal();
    })
  }

  //Cerrar el modal
  closeModal() {
  	this.viewCtrl.dismiss();
  }

}
