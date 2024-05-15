import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    { path: 'create-product', component: CreateProductComponent },
    { path: 'edit-product/:id', component: EditProductComponent  },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];
