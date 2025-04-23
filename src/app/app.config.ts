import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {
  ApplicationConfig,
  enableProdMode,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomTranslateLoader } from '@shared/translation';
import { environment } from '../environments/environment';
import { mockApiServer } from '../mocks';
import { appRoutes } from './app.routes';

registerLocaleData(localeFr);

if (!environment.production) {
  mockApiServer();
} else {
  enableProdMode();
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({}),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      appRoutes,
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding(),
    ),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      DatePipe,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: () => new CustomTranslateLoader(),
          deps: [HttpClient],
        },
      }),
    ),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: TranslateService,
    },
  ],
};
