from django.db import models
from essayfeeds.users.models import Profile
from .choices import (
TypeOfWork,
Subject,
Citation,
)




class Order(models.Model):
    """
    In this model i'll not be doing any custom config since we wont be making any order from the backend instead most of the config will be handleed on the model forms This applies to all the models
    """
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL,null=True, blank=True, related_name="profile_order")
    service = models.CharField(max_length=100, )
    type_of_work = models.CharField(max_length=100, default="Meal")
    academic_level = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    subject = models.CharField(max_length=100, )
    deadline = models.DateTimeField()
    pages_number = models.PositiveIntegerField(default=1)
    word_count = models.PositiveIntegerField(default=275)
    instructions = models.TextField(blank=True, null=True)
    citation_style = models.CharField(max_length=100,default="MLA")
    addons = models.ManyToManyField("Addon", blank=True)
    references = models.IntegerField(default=0)



    def __str__(self):
        return self.title
    

class Addon(models.Model):
    addon = models.CharField(max_length=100)
    selected = models.BooleanField(default=False)
    price = models.FloatField(default=100)

    def __str__(self):
        return self.addon
    
