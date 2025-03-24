import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'auth', component: AuthLayoutComponent, canActivate: [loggedGuard], children: [
    {path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent), title: 'login'},
    {path: 'register', loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent), title: 'register'}
  ]},
  {path: '', component: MainLayoutComponent, children: [
    {path: 'landing', loadComponent: () => import('./pages/landing/landing.component').then(c => c.LandingComponent), title: 'landing'},
    {path: 'home', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent), canActivate: [authGuard], title: 'home'},
    {path: 'products', loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent), canActivate: [authGuard], title: 'products'},
    {path: 'product/:id', loadComponent: () => import('./pages/product-details/product-details.component').then(c => c.ProductDetailsComponent), canActivate: [authGuard], title: 'product Details'},
    {path: 'aboutus', loadComponent: () => import('./pages/about-us/about-us.component').then(c => c.AboutUsComponent), canActivate: [authGuard], title: 'about us '},
    {path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(c => c.BlogComponent), canActivate: [authGuard], title: 'blog'},
    {path: 'contactus', loadComponent: () => import('./pages/contact-us/contact-us.component').then(c => c.ContactUsComponent), canActivate: [authGuard], title: 'contactus'},
    {path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) , title: '404'},
  ]}
];
