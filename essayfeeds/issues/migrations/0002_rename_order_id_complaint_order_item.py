# Generated by Django 5.0.1 on 2024-02-12 12:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("issues", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="complaint",
            old_name="order_id",
            new_name="order_item",
        ),
    ]