# Generated by Django 4.2.9 on 2024-02-06 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_profile"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="clientId",
            field=models.CharField(blank=True, max_length=109, null=True),
        ),
    ]
