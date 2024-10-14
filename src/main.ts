import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import appRouting from '@app/app.routing';
import { testReducer } from '@app/store/ngrx/ngxs-testing.store.reducer';
import { TestReducer } from '@app/store/ngxs/ngxs-testing.store.reducer';
import { TestReducer as TestReducerNgss } from '@app/store/testing.store.reducer';
import { StoreModule } from '@ngrx/store';
import { NgxsModule } from '@ngxs/store';
import { ShopReducer } from '@pages/shop/store/shop.store.reducer';
import { NGSSStoreModule } from 'ngss';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, RouterModule.forRoot(appRouting), ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
            NgxsModule.forRoot([
                TestReducer,
            ]),
            StoreModule.forRoot({
                test: testReducer,
            }),
            NGSSStoreModule.forRoot([
                ShopReducer,
                TestReducerNgss,
            ], {
                middlewares: [
                    // Mid0,
                    // Mid1,
                    // Mid2,
                ],
                useSignalStore: true,
            })),
        provideAnimations(),
    ]
})
    .catch(err => console.error(err));
