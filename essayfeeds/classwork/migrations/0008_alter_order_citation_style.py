# Generated by Django 5.0.1 on 2024-02-06 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("classwork", "0007_alter_order_type_of_work"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="citation_style",
            field=models.CharField(default="MLA", max_length=100),
        ),
    ]
