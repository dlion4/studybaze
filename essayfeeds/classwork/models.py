from django.db import models
from django.db.models import FloatField
from django.urls import reverse
from django.shortcuts import redirect
from essayfeeds.users.models import Profile
from django.db.models import Sum
import datetime
from django.utils import timezone 
from .choices import (
TypeOfWork,
Subject,
Citation,
)
from essayfeeds.utils import generate_random_id




class Order(models.Model):
    """
    In this model i'll not be doing any custom config since we wont be making any order from the backend instead most of the config will be handleed on the model forms This applies to all the models
    """
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL,null=True, blank=True, related_name="profile_order")
    service = models.CharField(max_length=100)
    type_of_work = models.CharField(max_length=100, default="Meal")
    academic_level = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    subject = models.CharField(max_length=100, )
    deadline = models.DateTimeField()
    pages_number = models.IntegerField(default=1)
    word_count = models.IntegerField(default=275)
    instructions = models.TextField(blank=True, null=True)
    citation_style = models.CharField(max_length=100,default="MLA")
    addons = models.ManyToManyField("Addon", blank=True)
    references = models.IntegerField(default=0)
    orderId = models.CharField(max_length=20, unique=True)
    price = models.FloatField(default=0.00)


    def __str__(self):
        return self.title
    

    
    def get_pages_price(self):
        return self.pages_number * self.price
    

    def get_reference(self):
        self.price += self.references * 0.01
        return self.price
    
    def get_deadline_countdown(self):
        return self.deadline -timezone.now()
    
    def get_formated_deadline_countdown(self):
        seconds = self.get_deadline_countdown().seconds
        hour=0
        minutes=0
        if seconds >= 216000:
            hour = seconds/216000
        elif 216000> seconds > 3600:
            minutes = seconds/3600
        if hour: return "%.0f"%hour
        else: return "%.0f"%minutes
    
    def get_deadline_price(self):
        self.price = 18
        if  self.get_deadline_countdown().days < 1 and int(self.get_formated_deadline_countdown()) < 4:
            self.price *= 2
        self.price += self.get_reference()
        self.price += self.get_pages_price()
        return self.price
    
    def get_final_price(self):
        self.price+=self.get_deadline_price()
        return self.price
    
    
    def get_absolute_url(self):
        return reverse("order_detail", kwargs={"order_id": self.pk})
    
    def save(self, *args, **kwargs):
        if self.orderId: pass
        else: 
            self.orderId = f"{generate_random_id(length=5)}{self.pk}"
        self.price=float(int(self.get_deadline_price()))   
        return super().save(*args, **kwargs)
        

class Addon(models.Model):
    addon = models.CharField(max_length=100)
    selected = models.BooleanField(default=False)
    price = models.FloatField(default=50)

    def __str__(self):
        return self.addon
    
