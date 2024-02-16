from django.contrib import admin
from .models import Deposit
# Register your models here.
@admin.register(Deposit)
class DepositAdmin(admin.ModelAdmin):
    list_display = ['client', 'amount', 'timestamp']