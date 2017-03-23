import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { BemPaiPage } from "../pages/bens/bem-pai/bem-pai";
import { ClientesPage } from "../pages/clientes/clientes";
import { LocalidadesPage } from "../pages/localidades/localidades";
import { BemFilhoPage } from "../pages/bens/bem-filho/bem-filho";
import { BensPage } from "../pages/bens/bens";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = BensPage;

  home = HomePage;
  clientes = ClientesPage;
  localidades = LocalidadesPage;
  bemPai = BemPaiPage;
  bemFilho = BemFilhoPage;
  bens = BensPage;
  //usuario = UsuarioPage;
  //signup = SignupPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  openPage(opcao){
    this.rootPage = opcao;
  };
  
}
