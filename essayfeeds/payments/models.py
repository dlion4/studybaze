from django.db import models
from essayfeeds.classwork.models import Order
from django.urls import reverse


class OrderItem(models.Model):
    order=models.OneToOneField(Order, on_delete=models.CASCADE, related_name="order_order_item")
    status =  models.CharField(choices=(("Active", "Active"), ("Approved", "Approved"), ("Completed", "Completed"), ("Cancelled", "Cancelled")), default="Active", max_length=100)
    price = models.FloatField()
    is_paid = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse("payment", kwargs={"order_pk": self.pk})
    
    def get_cancel_url(self):
        # This functrion willl generate the absolute url for cancelling the orderitem and the removing  the order from the ordritem model
        return reverse("users:cancel", kwargs={"id": self.pk})
    
    def __str__(self):
        return str(self.order.title)