from django.contrib import admin
from .models import OrderItem
# Register your models here.


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'status', 'price', 'is_paid']

