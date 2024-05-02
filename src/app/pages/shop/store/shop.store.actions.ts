import { ShopItem } from "@pages/shop/interfaces/shop-item.interface";
import { ActionClass } from "ngss";

export class GetShopItems extends ActionClass<void> {
  override readonly type = "[Shop] Get Shop Items";
}

export class AddToCart extends ActionClass<ShopItem> {
  override readonly type = "[Shop] Add to Cart";
}

export class RemoveFromCart extends ActionClass<number> {
  override readonly type = "[Shop] Remove from Cart";
}

export class ClearCart extends ActionClass<void> {
  override readonly type = "[Shop] Clear Cart";
}