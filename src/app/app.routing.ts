import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Error404PageComponent, Error404PageResolver } from './core';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AdminLayoutComponent,
    children: [
        {
          path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }
    ]},
  {
    path: '404',
    component: Error404PageComponent,
    resolve: { data: Error404PageResolver }
  },
  {
    // There's a bug that's preventing wild card routes to be lazy loaded (see: https://github.com/angular/angular/issues/13848)
    // That's why the Error page should be eagerly loaded
    path: '**',
    component: Error404PageComponent,
    resolve: { data: Error404PageResolver }
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    // RouterModule.forRoot(routes)
    RouterModule.forRoot(routes,
    { onSameUrlNavigation: 'reload',
      enableTracing : true, // For debugging
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      useHash: false
    }),
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
