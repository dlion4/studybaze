from django.db import models
from essayfeeds.classwork.models import Order

class OrderItem(models.Model):
    order=models.OneToOneField(Order, on_delete=models.CASCADE, related_name="order_order_item")
    status =  models.CharField(choices=(("Active", "Active"), ("Approved", "Approved"), ("Completed", "Completed"), ("Cancelled", "Cancelled")), default="Active", max_length=100)
    price = models.FloatField()


    def __str__(self):
        return str(self.order.title)