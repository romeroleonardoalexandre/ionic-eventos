import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { SpendingFormPage } from '../spending-form/spending-form';
/**
 * Generated class for the SpendinglistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spendinglist',
  templateUrl: 'spendinglist.html',
})
export class SpendinglistPage {
  public lista: any[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage:Storage) {
  }

  openDetail(item){
    this.navCtrl.push(SpendingFormPage,{'item':item});
  }

  openFormDetail(evento_id){
    this.navCtrl.push(SpendingFormPage,{evento_id: evento_id});
  }

  removeItem(id){
    this.http.delete('http://localhost:3456/gasto/'+id)
        .map(res => res.json()).subscribe(result => {
            this.navCtrl.push(SpendingFormPage)
        })
  }

  ionViewDidLoad() {
    if(this.navParams.get('evento_id')){
      let id = this.navParams.get('evento_id')
      console.log("Aqui", id)
      this.http.get('http://localhost:3456/gastobyeventoid/' + id)
      .map(res => res.json()).subscribe(data => {
        this.lista = data.gastos;
      })  
    }
  }

}
