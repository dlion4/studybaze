from django.core.management.base import BaseCommand
from essayfeeds.classwork.models import TypeOfWork, Citation, Subject

# class TypeOfWork(models.Model):
#     title = models.CharField(max_length=100)
#     price = models.FloatField()

class Command(BaseCommand):
    help = 'Create '


    def handle(self, *args, **kwargs):
        work = ['essay', 'testing', 'meal']
        for title in work:
            TypeOfWork.objects.update_or_create(title=title, price=100)


