import { Injectable } from '@angular/core';
import { SHOP_ITEMS_MOCK } from '@pages/shop/constants/shop-items.mock';
import { ShopItem } from '@pages/shop/interfaces/shop-item.interface';
import { interval, map, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopService {

  getShopItems(): Observable<ShopItem[]> {
    return interval(500).pipe(
      take(1),
      map(() => SHOP_ITEMS_MOCK),
    );
  }
}
