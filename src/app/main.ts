import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import moment from 'moment';
moment.locale('es');

platformBrowserDynamic().bootstrapModule(AppModule);
