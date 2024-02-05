from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.contrib.flatpages import views as flatpage_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("entry.urls")),
    path("order/", include("order.urls")),
    path("users/", include("users.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [
    path("service-policy/", flatpage_views.flatpage, {"url": "/service-policy/"}, name="service-policy"),
    path("privacy/", flatpage_views.flatpage, {"url": "/privacy/"}, name="privacy"),
]