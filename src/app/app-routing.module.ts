import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
 
  {
    path: 'product',
    loadChildren: () =>
      import('./site/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./site/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./site/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./site/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./site/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'myaccount/wishlist',
    loadChildren: () =>
      import('./site/myaccount/wishlist/wishlist.module').then(
        (m) => m.WishlistModule
      ),
  },
  { path: 'search', loadChildren: () => import('./site/search/search.module').then(m => m.SearchModule) },
  {
    path: '**', // Navigate to Home Page if not found any page
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
