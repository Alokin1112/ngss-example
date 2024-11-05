import { Routes } from "@angular/router";
import { AppComponent } from "@app/app.component";
import { ROUTES_PATH } from "@core/constants/routes-path.const";
import { HomeComponent } from "@pages/home/home.component";
import { ShopCartComponent } from "@pages/shop/components/shop-cart/shop-cart.component";
import { ShopComponent } from "@pages/shop/shop.component";
import { TestComponentComponent } from "@pages/test-component/test-component.component";
import { VectorPaintComponent } from "@pages/vector-paint/vector-paint.component";

export default [
  {
    path: '',
    redirectTo: ROUTES_PATH.VECTOR_PAINT,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ROUTES_PATH.TEST,
        component: TestComponentComponent,
      },
      {
        path: ROUTES_PATH.SHOP,
        component: ShopComponent,
      },
      {
        path: ROUTES_PATH.CART,
        component: ShopCartComponent,
      },
      {
        path: ROUTES_PATH.VECTOR_PAINT,
        component: VectorPaintComponent,
      }
    ]
  }
] as Routes;