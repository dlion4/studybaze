from .models import Deposit
from essayfeeds.users.models import Profile
from django.db.models import Sum


def get_finance_context_data(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        try:
            return {
                "balance": Deposit.objects.filter(client=profile, is_verified=True).aggregate(balance=Sum("amount"))['balance']
            }
        except Deposit.DoesNotExist:
            return {"balance":"0.00"}
    return  {"balance": "0.00"}
