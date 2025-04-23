import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  private readonly _http = inject(HttpClient);
  prefix = '/assets/i18n/';
  suffix = '.json';

  getTranslation(lang: string): Observable<unknown> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    });

    return this._http.get(`${this.prefix}${lang}${this.suffix}`, { headers });
  }
}
