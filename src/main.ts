import { importProvidersFrom, isDevMode } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import appRouting from '@app/app.routing';
import { TestReducer } from '@app/store/testing.store.reducer';
import { DecoratorService, NGSSStoreModule } from 'ngss';
import { AppComponent } from './app/app.component';
import { Mid0, Mid1, Mid2 } from '@app/store/testing.middleware';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, RouterModule.forRoot(appRouting), ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
            NGSSStoreModule.forRoot([TestReducer], {
                middlewares: [
                    Mid0,
                    Mid1,
                    Mid2,
                ]
            }),
        ),
        DecoratorService,
        provideAnimations(),
    ]
})
    .catch(err => console.error(err));
