from django.contrib import admin
from .choices import (
TypeOfWork,
Subject,
Citation,
)
from .models import (Order, Addon)
# Register your models here.

@admin.register(TypeOfWork)
class TypeOfWorkAdmin(admin.ModelAdmin):
    list_display = ['title', 'price']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'price']

@admin.register(Citation)
class CitationAdmin(admin.ModelAdmin):
    list_display = ['citation']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass

@admin.register(Addon)
class AddonAdmin(admin.ModelAdmin):
    pass