import { Routes } from "@angular/router";
import { AppComponent } from "@app/app.component";
import { ROUTES_PATH } from "@core/constants/routes-path.const";
import { HomeComponent } from "@pages/home/home.component";
import { ShopComponent } from "@pages/shop/shop.component";
import { TestComponentComponent } from "@pages/test-component/test-component.component";

export default [
  {
    path: '',
    redirectTo: ROUTES_PATH.TEST,
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
      }
    ]
  }
] as Routes;