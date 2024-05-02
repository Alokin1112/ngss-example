import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShopItem } from '@pages/shop/interfaces/shop-item.interface';
import { GetShopItems } from '@pages/shop/store/shop.store.actions';
import { ShopReducer } from '@pages/shop/store/shop.store.reducer';
import { SignalSelector, Store } from 'ngss';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShopItemsListComponent } from '@pages/shop/components/shop-items-list/shop-items-list.component';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ds-shop',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, ShopItemsListComponent, RouterModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit {

  @SignalSelector(ShopReducer.getCartLength)
  cartLength$: Signal<number>;

  @SignalSelector((store: { shop: { itemsList: ShopItem[] } }) => store?.shop.itemsList)
  itemsList$: Signal<ShopItem[]>;

  link = `/${ROUTES_PATH.CART}`;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetShopItems());
  }
}
