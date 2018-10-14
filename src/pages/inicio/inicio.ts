import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController/*, Platform*/ } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; //Añadido tutorial
import { ModalNuevoSitioPage } from '../modal-nuevo-sitio/modal-nuevo-sitio';
//import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps'; //Añadido tutorial

declare var google: any;

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})

export class InicioPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any; //Manejador del mapa
  coords: any = { lat: 0, lng: 0 };

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	//public platform: Platform,
  	public geolocation: Geolocation,
  	public modalCtrl: ModalController) { //platform añadido de tutorial
  	
  	/*this.platform.ready().then(() => {
  		//La plataforma está lista y tenemos acceso a los plugins
  		this.obtenerPosicion();
  	});*/
  }

  //Se ejecuta cuando la página ha sido cargada
  ionViewDidLoad() {
  	this.loadMap();
  }

  //Para que no diera fallo, cambiar líneas access en el config.xml
  loadMap() {
  	this.geolocation.getCurrentPosition().then((position) => {
  		let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  		this.coords.lat = latLng.lat();
  		this.coords.lng = latLng.lng();
  
  		let mapOptions = {
  			center: latLng,
  			zoom: 15,
  			mapTypeId: google.maps.MapTypeId.ROADMAP
  		};

  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  		
  		//Colocamos el marcador de la posición
  		let marker = new google.maps.Marker({
  			icon: 'assets/imgs/marker.png',
  			map: this.map,
  			position: latLng
  		});
  	}, (error) => {
  		console.log(error);
  	});
  }

  nuevoSitio() {
  	//Esta función se llama cuando se pulsa el botón añadir sitio en "Inicio"
  	let modal = this.modalCtrl.create(ModalNuevoSitioPage, this.coords);
  	modal.present();
  }

}
