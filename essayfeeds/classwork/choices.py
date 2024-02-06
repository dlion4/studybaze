from django.db import models



class Subject(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return self.title
    

class Citation(models.Model):
    citation = models.CharField(max_length=100)

    def __str__(self):
        return self.citation
    

class TypeOfWork(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()



    def __str__(self):
        return self.title