
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    # Django Admin
    path('admin/', admin.site.urls),

    # Travel Enquiry APIs
    path('api/enquiries/', include('enquiries.urls')),

    # JWT Login API
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # JWT Token Refresh API
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
