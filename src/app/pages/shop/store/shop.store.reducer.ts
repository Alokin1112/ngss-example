import { inject, Injectable } from "@angular/core";
import { ShopService } from "@pages/shop/api/shop.service";
import { ShopItem } from "@pages/shop/interfaces/shop-item.interface";
import { AddToCart, ClearCart, GetShopItems, RemoveFromCart } from "@pages/shop/store/shop.store.actions";
import { ActionHandler, ActionHandlerContext, StoreSignalReducer } from "ngss";
import { of, tap } from "rxjs";

export interface ShopState {
  cart: ShopItem[];
  itemsList: ShopItem[];
}

const initialState: ShopState = {
  cart: [],
  itemsList: null,
};

@Injectable({ providedIn: 'root' })
export class ShopReducer extends StoreSignalReducer<ShopState> {
  readonly name = "shop";

  shopService = inject(ShopService);
  constructor() {
    super(initialState);
  }

  static getCartLength(state: any): number {
    return state.shop.cart.length;
  }

  @ActionHandler(GetShopItems)
  getShopItems(context: ActionHandlerContext<ShopState>) {
    if (context.getState().itemsList) return of(null);
    return this.shopService.getShopItems().pipe(
      tap((shopItems) => context.patchState({ itemsList: shopItems }))
    );
  }

  @ActionHandler(AddToCart)
  addToCart(context: ActionHandlerContext<ShopState>, payload: ShopItem) {
    context.patchState({
      cart: [...context.getState().cart, payload]
    });
  }

  @ActionHandler(RemoveFromCart)
  removeFromCart(context: ActionHandlerContext<ShopState>, id: number) {
    const cart = context.getState().cart;
    const firstFoundIndex = cart.findIndex((item) => item.id === id)
    if (firstFoundIndex !== -1) {
      cart.splice(firstFoundIndex, 1);
      context.patchState({
        cart,
      });
    }
  }

  @ActionHandler(ClearCart)
  clearCart(context: ActionHandlerContext<ShopState>) {
    context.patchState({
      cart: []
    });
  }

}