import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MaincontainerComponent } from './maincontainer/maincontainer.component';
import { ArticlesComponent } from './maincontainer/articles/articles.component';
import { AddArticleComponent } from './maincontainer/add-article/add-article.component';

// firebase
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


// ROUTAGE
import { Routes, RouterModule } from '@angular/router';

// CONSTANTE DE CONFIGURATION DE FIREBASE
const CONFIG: FirebaseAppConfig = {
  apiKey: 'AIzaSyCKL8v0-kcAsQl61IFw8fO7p3NyTg80A1M',
  authDomain: 'administration-ba909.firebaseapp.com',
  databaseURL: 'https://administration-ba909.firebaseio.com',
  projectId: 'administration-ba909',
  storageBucket: 'administration-ba909.appspot.com',
  messagingSenderId: '913556907353'
};
// CONSTANTE DE CONFIGURATION DU ROUTAGE
const MYROUTES: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent },
  { path: 'add-article', component: AddArticleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    SidemenuComponent,
    MaincontainerComponent,
    ArticlesComponent,
    AddArticleComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(CONFIG),
    AngularFireDatabaseModule,
    RouterModule.forRoot(MYROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
