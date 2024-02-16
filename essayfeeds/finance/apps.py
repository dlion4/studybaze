from django.apps import AppConfig


class FinanceConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "essayfeeds.finance"

    def ready(self) -> None:
        from .models import deposit_post_save_on_user_create_receiver
        return super().ready()
