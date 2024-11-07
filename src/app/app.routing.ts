import { Routes } from "@angular/router";
import { ROUTES_PATH } from "@core/constants/routes-path.const";
import { HomeComponent } from "@pages/home/home.component";
import { ShopCartComponent } from "@pages/shop/components/shop-cart/shop-cart.component";
import { ShopComponent } from "@pages/shop/shop.component";
import { TestComponentComponent } from "@pages/test-component/test-component.component";
import { VectorEllipseShapeGeneratorServiceService } from '@pages/vector-paint/services/shape-generators/vector-ellipse-shape-generator.service.service';
import { VectorLineShapeGeneratorService } from '@pages/vector-paint/services/shape-generators/vector-line-shape-generator.service';
import { VectorRectangleShapeGeneratorService } from "@pages/vector-paint/services/shape-generators/vector-rectangle-shape-generator.service";
import { VectorShapesGeneratorService } from "@pages/vector-paint/services/vector-shapes-generator.service";
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
        providers: [
          VectorShapesGeneratorService,
          VectorRectangleShapeGeneratorService,
          VectorEllipseShapeGeneratorServiceService,
          VectorLineShapeGeneratorService
        ]
      }
    ]
  }
] as Routes;