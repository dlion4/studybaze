from django import forms
from .models import Order, Addon
from .choices import (
TypeOfWork,
Subject,
Citation,
)

class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True

class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = single_file_clean(data, initial)
        return result



"""Will be impelementing the renderfield model form using the django package
This will apply mostly for allmost the enetire forms
The implementaion is applied on the forms to avoid duplication of code both imn the admin
"""
OrderFormFieldList = ["service","type_of_work","academic_level","title","subject","deadline","pages_number","instructions","addons","citation_style", "references", "files",
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
    deadline = forms.DateTimeField(widget=forms.DateTimeInput(attrs={"type":"datetime-local"}))
    addons = forms.ModelMultipleChoiceField(queryset=Addon.objects.all(), help_text="Hold down “Control”, or “Command” on a Mac, to select more than one.", required=False, widget=forms.SelectMultiple)
    # This noew sema more readable and clean
    files = MultipleFileField()
    class Meta:
        model = Order
        fields = OrderFormFieldList
        widgets = {
            "service": forms.Select(choices=(
                ("Writing","Writing"),("Editing","Editing"),("Proof","Proof")
            )),
            
            "academic_level": forms.Select(choices=(
                ("HighSchool","High School"),("College","College"),("Masters","Masters"), ("PhD",'PhD')
            )),
            
            "title": forms.TextInput(attrs={"class": ""}),
            "instructions": forms.Textarea(),
            "references":forms.NumberInput(attrs={"min":"0"}),
            "pages_number":forms.NumberInput(attrs={"min":"1"}),
            "files": MultipleFileInput(attrs={"class": "form-control"})
        }
        labels = {
            "title": "Please enter the project title to proceed.",
            "files": "Assignment Files (Optional)"
        }
        help_text = {
            "files": "You can upload multiple files here."
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)



