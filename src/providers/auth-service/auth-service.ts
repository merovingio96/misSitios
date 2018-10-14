import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthServiceProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthServiceProvider Provider');
  }

  //Función para registrar a un nuevo usuario
  registerUser(email:string, password:string) {
  	return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  	.then((res) => {
  		//El usuario se ha creado correctamente
  	})
  	.catch(err => Promise.reject(err))
  }

  //Función para iniciar sesión con un usuario
  loginUser(email:string, password:string) {
  	return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  	.then(user => Promise.resolve(user))
  	.catch(err => Promise.reject(err))
  }

  //Devuelve la sesión
  get session() {
  	return this.afAuth.authState;
  }

  //Salida del usuario de la sesión (logout)
  logout() {
  	this.afAuth.auth.signOut().then(() => {
  		//Hemos salido
  	})
  }

  //Obtener el identificador del usuario que actualmente tiene sesión activa
  getUser() {
  	return this.afAuth.auth.currentUser.uid;
  }

}
