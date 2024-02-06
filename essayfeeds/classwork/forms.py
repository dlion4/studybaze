from django import forms
from .models import Order, Addon
from .choices import (
TypeOfWork,
Subject,
Citation,
)
from .custom_form_widgets import FriendlySplitDateTimeWidget

"""Will be impelementing the renderfield model form using the django package
This will apply mostly for allmost the enetire forms
The implementaion is applied on the forms to avoid duplication of code both imn the admin
"""
OrderFormFieldList = ["service","type_of_work","academic_level","title","subject","deadline","pages_number","word_count","instructions","citation_style", "references"
]


def get_select_choices(**kwargs):
    # minimize the code duplication
    return tuple(enumerate({**kwargs}))

def model_selection_field(model_queryset,field_name:str=None, className:str=None, initial_value=None):
    # REMOVE THE CODE DUPLICATION

    """The class name wuill hbe passed to allow for dynamoic styling of each field"""
    return forms.ModelChoiceField(queryset=model_queryset.objects.all(), widget=forms.Select(attrs={"class": className}),initial=initial_value)


class OrderForm(forms.ModelForm):
    # the aboe function will hel remove most of these duplicate
    # according to the DRYT PRINCIPLE

    type_of_work = model_selection_field(model_queryset=TypeOfWork, initial_value="Essay")
    subject = model_selection_field(model_queryset=Subject,initial_value="Dance")
    citation_style=model_selection_field(
        model_queryset=Citation,
        initial_value="MLA"
    )
    deadline = forms.DateTimeField()
    # This noew sema more readable and clean

    class Meta:
        model = Order
        fields = OrderFormFieldList
        widgets = {
            "service": forms.Select(choices=(
                get_select_choices(
                Writing="Writing",Editing="Editing",Proof="Proof"
            )
            )),
            "academic_level": forms.Select(choices=(
                get_select_choices(HighSchool="High School",College="College",Masters="Masters", PhD='PhD')
            )),
            
            "title": forms.TextInput(attrs={"class": ""}),
            "instructions": forms.Textarea()
        }
        labels = {
            "title": "Please enter the project title to proceed."
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)



class AddonForm(forms.ModelForm):
    class Meta:
        model = Addon
        fields = [
            "selected",
            "price"
        ]
