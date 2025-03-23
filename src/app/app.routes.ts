import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'auth', component: AuthLayoutComponent, canActivate: [loggedGuard], children: [
    {path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent), title: 'login page'},
    {path: 'register', loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent), title: 'register page'}
  ]},
  {path: '', component: MainLayoutComponent, children: [
    {path: 'landing', loadComponent: () => import('./pages/landing/landing.component').then(c => c.LandingComponent), title: 'landing page'},
    {path: 'home', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent), canActivate: [authGuard], title: 'home page'},
    {path: 'products', loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent), canActivate: [authGuard], title: 'products page'},
    {path: 'aboutus', loadComponent: () => import('./pages/about-us/about-us.component').then(c => c.AboutUsComponent), canActivate: [authGuard], title: 'aboutus page'},
    {path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(c => c.BlogComponent), canActivate: [authGuard], title: 'blog page'},
    {path: 'contactus', loadComponent: () => import('./pages/contact-us/contact-us.component').then(c => c.ContactUsComponent), canActivate: [authGuard], title: 'contactus page'},
    {path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) , title: '404 page'},
  ]}
];
