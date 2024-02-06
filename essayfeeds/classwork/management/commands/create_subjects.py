subject = [
"Architecture",
"Dance",
"Design",
"Analysis",
"Drama",
"Movies",
"Music",
"Paintings",
"Theatre",
"Biology",
"Business",
"Chemistry",
"Advertising",
"Communication",
"Strategies",
"Journalism",
"Public Relations",
"Economics",
"Company",
"Analysis",
"Commerce",
"Investment",
"Logistics",
"Trade",
"Education",
"Pedagogy",
"Teachers Career",
"Engineering",
"English",
"Ethics",
]

from essayfeeds.classwork.models import TypeOfWork, Citation, Subject
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for s in subject:
            Subject.objects.update_or_create(title=s, price=100)