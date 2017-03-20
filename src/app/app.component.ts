import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LocalidadesPage } from '../pages/localidades/localidades';
import { ClientesPage } from '../pages/clientes/clientes';
import { BemFilhoPage } from "../pages/bem-filho/bem-filho";
import { BemPaiPage } from "../pages/bem-pai/bem-pai";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = BemPaiPage;

  home = HomePage;
  clientes = ClientesPage;
  localidades = LocalidadesPage;
  bemPai = BemPaiPage;
  BemFilho = BemFilhoPage;
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
