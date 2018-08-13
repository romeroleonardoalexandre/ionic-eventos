import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { SpendinglistPage } from '../spendinglist/spendinglist';


/**
 * Generated class for the SpendingFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spending-form',
  templateUrl: 'spending-form.html',
})
export class SpendingFormPage {
  gastoForm: FormGroup;
  gastoError: string;

  private data:any;
  private headers: Headers = new Headers();
  private id_evento:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb:FormBuilder, private http: Http) {

    if(this.navParams.get('evento_id')){
      this.id_evento = this.navParams.get('evento_id')
    }

    this.gastoForm = fb.group({
			titulo: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([null])],
      pago:['', Validators.compose([Validators.required])],
      data_gasto:['',null],
      valor:['',null],
      id:['', null]
    });

    if(this.navParams.get('item')){
      let gasto = this.navParams.get('item')
      this.gastoForm = fb.group({
        titulo: [gasto.titulo, Validators.compose([Validators.required])],
        descricao: [gasto.descricao, Validators.compose([null])],
        pago:[gasto.pago, Validators.compose([Validators.required])],
        data_gasto:[gasto.data_evento,null],
        valor:[gasto.valor,null],
        id:[gasto.id, null]
      });
    }

  }

  handleEvent(){
    this.data = this.gastoForm.value;
    if (!this.data.titulo) {
			return;
    }

    this.headers.append('Content-Type', 'application/json');
    //create
    if(this.data.id == ""){
      console.log({gasto:this.data, id:this.id_evento});
        let gasto = {gasto:this.data, id:this.id_evento}
        
        this.http.post('http://localhost:3456/gasto',gasto, {headers:this.headers})
        .map(res => res.json()).subscribe(result => {
            this.navCtrl.push(SpendinglistPage)
        })
    //update
    }else{
        let gasto = {gasto:this.data, id:this.id_evento}
        this.http.put('http://localhost:3456/gasto',gasto)
        .map(res => res.json()).subscribe(result => {
            this.navCtrl.push(SpendinglistPage)
        })
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpendingFormPage');
  }

}
