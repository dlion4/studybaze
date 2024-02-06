# Generated by Django 5.0.1 on 2024-02-06 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("classwork", "0008_alter_order_citation_style"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="addon",
            name="order",
        ),
        migrations.AddField(
            model_name="order",
            name="addons",
            field=models.ManyToManyField(blank=True, to="classwork.addon"),
        ),
    ]
