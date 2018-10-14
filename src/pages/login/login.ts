import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	user = {email:'', password:''};

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public auth: AuthServiceProvider,
  	public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //signIn() llama al método registerUser() del provider AuthServiceProvider
  signIn() {
  	this.auth.registerUser(this.user.email, this.user.password)
  	.then(() => {
  		//El usuario se ha creado correctamente, entra en el sistema logueado
      this.auth.loginUser(this.user.email, this.user.password)
      .then(() => {
        //Ya estamos dentro
      });
  	})
  	.catch(err => {
  		let alert = this.alertCtrl.create({
  			title: 'Error',
  			subTitle: err.message,
  			buttons: ['Aceptar']
  		});
  		alert.present();
  	})
  }

  //login() llama al método loginUser() del provider AuthServiceProvider
  login() {
  	this.auth.loginUser(this.user.email, this.user.password)
  	.then((user) => {
  		//El usuario se ha logueado correctamente
  	})
  	.catch(err => {
  		let alert = this.alertCtrl.create({
  			title: 'Error',
  			subTitle: err.message,
  			buttons: ['Aceptar']
  		});
  		alert.present();
  	})
  }
  
}
