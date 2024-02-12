from django.db import models
from essayfeeds.users.models import Profile
from essayfeeds.payments.models import OrderItem

# Create your models here.


class Complaint(models.Model):
    client = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="client_profile")
    order_type = models.CharField(max_length=100)
    nature = models.CharField(max_length=100)
    order_item = models.ForeignKey(OrderItem, on_delete=models.SET_NULL, blank=True, null=True)
    channel = models.CharField(max_length=100)
    status = models.CharField(max_length=1, choices=(("O", "Open"), ("C", "Closed")), default="O")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.order_type)