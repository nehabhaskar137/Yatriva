
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('access_token');

  // Public enquiry submission must not carry an admin token
  if (req.url.includes('/api/enquiries/submit/')) {
    const publicRequest = req.clone({
      headers: req.headers.delete('Authorization')
    });

    return next(publicRequest);
  }

  // Attach admin token to other enquiry API requests
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
