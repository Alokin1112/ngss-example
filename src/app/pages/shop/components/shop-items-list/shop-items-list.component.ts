import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { ShopItem } from '@pages/shop/interfaces/shop-item.interface';
import { AddToCart } from '@pages/shop/store/shop.store.actions';
import { Store } from 'ngss';

@Component({
  selector: 'ds-shop-items-list',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './shop-items-list.component.html',
  styleUrl: './shop-items-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemsListComponent {
  @Input() items: ShopItem[];


  constructor(
    private store: Store,
  ) { }

  addItemToCart(item: ShopItem) {
    this.store.dispatch(new AddToCart(item));
  }
}
