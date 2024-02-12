from django import forms
from .models import Complaint
from essayfeeds.classwork.choices import (
TypeOfWork,
)
# from essayfeeds.classwork.forms import model_selection_field

# def model_selection_field(model_queryset,field_name:str=None, className:str=None, initial_value=None):
#     # REMOVE THE CODE DUPLICATION

#     """The class name wuill hbe passed to allow for dynamoic styling of each field"""
#     return forms.ModelChoiceField(queryset=model_queryset.objects.all(), widget=forms.Select(attrs={"class": className}),initial=initial_value)
 
class ComplaintForm(forms.ModelForm):
    order_type = forms.CharField(widget=forms.Select(choices=(("Writing", "Writing"),("Editting", "Editting"), ("ProofReading", "ProofReading"))))
    order_id = forms.CharField(widget=forms.TextInput())
    channel = forms.CharField(widget=forms.RadioSelect(choices=(
        ("Email", "Email"),("Whatsapp", "Whatsapp")
    )))
    nature = forms.CharField(widget=forms.Select(choices=(
        ("Work Quality", "Work Quality"),
        ("Customer Support", "Customer Support"),
        ("Late Delivery", "Late Delivery"),
        ("Others", "Others"),
        ("Plagerism", "Plagerism"),
    )))
    class Meta:
        model = Complaint
        fields = ["order_type", "nature", "order_id", "channel"]