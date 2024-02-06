from django.core.management.base import BaseCommand
from essayfeeds.classwork.choices import Citation

citations = ["APA","CBE","Chicago","Harvard","MLA","Oxford","Turabian","Vancouver","Other",
]

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for cite in citations:
            Citation.objects.update_or_create(citation=cite)