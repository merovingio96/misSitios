import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the ModalDetalleSitioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detalle-sitio',
  templateUrl: 'modal-detalle-sitio.html',
})
export class ModalDetalleSitioPage {
  
  sitio: any;
  edit: boolean = false;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private launchNavigator: LaunchNavigator,
  	private camera: Camera,
  	private dbFirebase: FirebaseDbProvider, 
  	private viewCtrl: ViewController) {

  	  this.sitio = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleSitioPage');
  }

  //Muestra la ruta desde tu ubicación actual al sitio que tienes abierto en el detalle
  comoLlegar() {
  	let destino = this.sitio.lat + ',' + this.sitio.lng;
  	this.launchNavigator.navigate(destino)
  	.then(
  		success => console.log('Launched navigator'),
  		error => console.log('Error launching navigator', error)
  	);
  }

  //Función calcada a la de modal nuevo sitio salvo por photo != sitio.photo
  sacarFoto() {
  	let cameraOptions: CameraOptions = {
  		quality: 50,
  		encodingType: this.camera.EncodingType.JPEG,
  		targetWidth: 800,
  		targetHeight: 600,
  		destinationType: this.camera.DestinationType.DATA_URL,
  		sourceType: this.camera.PictureSourceType.CAMERA,
  		correctOrientation: true
  	}

  	this.camera.getPicture(cameraOptions).then((imageData) => {
  		this.sitio.photo = "data:image/jpeg;base64," + imageData;	
  	}, (err) => {
  		console.log(err);
  	});
  }

  //Se edita un sitio de la base de datos
  guardarCambios() {
  	let sitio = {
  		id: this.sitio.id,
  		lat: this.sitio.lat,
  		lng: this.sitio.lng,
  		address: this.sitio.address,
  		description: this.sitio.description,
  		photo: this.sitio.photo
  	}
  	this.dbFirebase.guardarSitio(sitio).then((res) => {
  	  console.log('Sitio modificado en Firebase');
  	  this.cerrarModal();
  	});
  }

  //Cambiar el valor de la variable editar
  editar() {
  	this.edit = true;
  }

  //Cerrar la ventana de detalle de sitio
  cerrarModal() {
  	this.viewCtrl.dismiss();
  }

}
