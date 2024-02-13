# Generated by Django 5.0.1 on 2024-02-12 12:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("issues", "0003_complaint_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="complaint",
            name="timestamp",
            field=models.DateTimeField(
                auto_now_add=True,
                default=datetime.datetime(2024, 2, 12, 12, 48, 1, 984392, tzinfo=datetime.timezone.utc),
            ),
            preserve_default=False,
        ),
    ]