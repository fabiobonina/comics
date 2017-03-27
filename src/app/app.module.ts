
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { Database } from '../providers/database';
import { Image } from '../providers/image';
import { ClientesPage } from "../pages/clientes/clientes";
import { ClienteModalPage } from "../pages/clientes/cliente-modal/cliente-modal";
import { ClienteDetalhePage } from "../pages/clientes/cliente-detalhe/cliente-detalhe";
import { LocalidadesPage } from "../pages/localidades/localidades";
import { LocalidadeModalPage } from "../pages/localidades/localidade-modal/localidade-modal";
import { LocalidadeDetalhePage } from "../pages/localidades/localidade-detalhe/localidade-detalhe";
import { DataCliente } from "../providers/dataCliente";
import { DataLocalidade } from "../providers/dataLocalidade";
import { BensPage } from "../pages/bens/bens";
import { BensModalPage } from "../pages/bens/bens-modal/bens-modal";
import { DataBens } from "../providers/bens/data-bens";
import { BemPaiPage } from "../pages/bens/bem-pai/bem-pai";
import { BemPaiModalPage } from "../pages/bens/bem-pai/bem-pai-modal/bem-pai-modal";
import { BemPaiDetalhePage } from "../pages/bens/bem-pai/bem-pai-detalhe/bem-pai-detalhe";
import { DataBemPai } from "../providers/bens/dataBem-pai";
import { BemFilhoPage } from "../pages/bens/bem-filho/bem-filho";
import { BemFilhoModalPage } from "../pages/bens/bem-filho/bem-filho-modal/bem-filho-modal";
import { BemFilhoDetalhePage } from "../pages/bens/bem-filho/bem-filho-detalhe/bem-filho-detalhe";
import { DataBemFilho } from "../providers/bens/dataBem-filho";
import { BemFamiliaPage } from "../pages/bens/bem-familia/bem-familia";
import { BemFamiliaModalPage } from "../pages/bens/bem-familia/bem-familia-modal/bem-familia-modal";
import { DataBemFamilia } from "../providers/bens/data-bem-familia";
import { Preloader } from "../providers/preloader";
import { DataProduto } from "../providers/data-produto";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    ClientesPage,
    ClienteModalPage,
    ClienteDetalhePage,
    LocalidadesPage,
    LocalidadeModalPage,
    LocalidadeDetalhePage,
    BensPage,
    BensModalPage,
    BemPaiPage,
    BemPaiModalPage,
    BemPaiDetalhePage,
    BemFilhoPage,
    BemFilhoModalPage,
    BemFilhoDetalhePage,
    BemFamiliaPage,
    BemFamiliaModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    ClientesPage,
    ClienteModalPage,
    ClienteDetalhePage,
    LocalidadesPage,
    LocalidadeModalPage,
    LocalidadeDetalhePage,
    BensPage,
    BensModalPage,
    BemPaiPage,
    BemPaiModalPage,
    BemPaiDetalhePage,
    BemFilhoPage,
    BemFilhoModalPage,
    BemFilhoDetalhePage,
    BemFamiliaPage,
    BemFamiliaModalPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {provide: Database, useClass: Database},
              {provide: Image, useClass: Image},
              {provide: DataCliente, useClass: DataCliente},
              {provide: DataLocalidade, useClass: DataLocalidade},
              {provide: DataBens, useClass: DataBens},
              {provide: DataBemPai, useClass: DataBemPai},
              {provide: DataBemFilho, useClass: DataBemFilho},
              {provide: DataBemFamilia, useClass: DataBemFamilia},
              {provide: Preloader, useClass: Preloader},
              {provide: DataProduto, useClass: DataProduto},]
})
export class AppModule {}
