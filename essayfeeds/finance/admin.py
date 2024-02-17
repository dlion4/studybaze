from django.contrib import admin
from .models import Deposit


# Register your models here.
@admin.register(Deposit)
class DepositAdmin(admin.ModelAdmin):
    list_display = ["client", "amount", "timestamp", "is_verified"]


def create_deposit_for_new_profile(sender, instance, created, **kwargs):
    if created:
        # Create a new Deposit instance for the newly created profile
        Deposit.objects.create(client=instance)
