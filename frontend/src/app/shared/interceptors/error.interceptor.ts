import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageTokenService } from '@domain/auth/shared/services/storage-token.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(({ error }: { error: HttpErrorResponse & { statusCode: number } }) => {
        let { message, statusCode } = error;

        if (statusCode === HttpStatusCode.Unauthorized) {
          new StorageTokenService().remove();
          location.reload();
        }

        message = typeof message === 'object' ? message[0] : message;

        return throwError(message);
      })
    );
  }
}

export const HTTP_ERROR_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
