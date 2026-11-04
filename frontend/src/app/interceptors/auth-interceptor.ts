import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('access_token');

  // Attach token only to Yatriva enquiry API requests
  if (
    token &&
    req.url.startsWith('http://127.0.0.1:8000/api/enquiries/')
  ) {

    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authRequest);
  }

  return next(req);
};