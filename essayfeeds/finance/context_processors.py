from .models import Deposit
from essayfeeds.users.models import Profile

def get_finance_context_data(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        return {
            "balance":Deposit.objects.get(client=profile)
        }