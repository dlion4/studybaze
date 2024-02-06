from django.core.management.base import BaseCommand
from essayfeeds.classwork.models import Addon

addons = {
    "plag reporty":89,
    "abstract":101,
    "review":19,
    "ai help":90
}


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for key_addon, price in tuple(addons.items()):
            Addon.objects.update_or_create(addon=key_addon, price=price)