import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { ShopItem } from '@pages/shop/interfaces/shop-item.interface';
import { ClearCart, RemoveFromCart } from '@pages/shop/store/shop.store.actions';
import { SignalSelector, Store } from 'ngss';

@Component({
  selector: 'ds-shop-cart',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatCardModule, RouterModule
  ],
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCartComponent {
  @SignalSelector((store: { shop: { cart: ShopItem[] } }) => store?.shop.cart)
  cartItems$: Signal<ShopItem[]>;

  link = `/${ROUTES_PATH.SHOP}`;

  constructor(
    private store: Store,
  ) { }

  deleteItemFromCart(id: number): void {
    this.store.dispatch(new RemoveFromCart(id));
  }

  clearCart(): void {
    this.store.dispatch(new ClearCart());
  }
}
