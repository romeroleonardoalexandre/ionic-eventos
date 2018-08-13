import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup'
import { EventListPage } from '../event-list/event-list';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { FileChooser } from '@ionic-native/file-chooser'

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
  loginForm: FormGroup;
	loginError: string;
	private headers: Headers = new Headers();
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams, 
		public fb:FormBuilder,
		private auth:AuthService,
		private storage:Storage,
		private http: Http,
		private fileChooser: FileChooser
		
	) {
    this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
		
  }
  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.headers.append('Content-Type', 'application/json');

		this.auth.signInWithEmail(credentials)
			.then((user) => {
				this.http.get('http://localhost:3456/getuserbyemail/' + user.user.email)
				.map(res => res.json()).subscribe(data => {
					if(	data.usuario.length == 0){
							this.http.post('http://localhost:3456/usuario',{user: credentials}, {headers:this.headers})
							.map(res => res.json()).subscribe(result => {
								this.storage.clear().then(()=>{
									this.storage.set('usuario', result.user.id);
									this.navCtrl.setRoot(EventListPage)
								})
								
							})
					}else{
						this.storage.clear().then(()=>{
							this.storage.set('usuario', data.usuario[0].id);
							this.navCtrl.setRoot(EventListPage)
						})
					}
							
				})
			}
			).catch((error)=>{
				error => this.loginError = error.message
			});
	}

	signup(){
		// this.navCtrl.push(RegisterPage);
	}

	loginWithGoogle() {
		this.auth.signInWithGoogle()
			.then(
				(user) => {

					this.navCtrl.setRoot(EventListPage)
				},
				error => console.log(error.message)
			).catch((error)=>{
				console.log("deu ruim");
			});
	}

}
