from django.views.generic import View
from essayfeeds.payments.models import OrderItem
from django.shortcuts import get_object_or_404
from essayfeeds.payments.mixins import SuccessRedirectView



class EssayFeedsOrderItemCancelView(SuccessRedirectView):
    """This view will mainly handle the cancel orderitem
    It will change the stat8us of the orderitem from active to cancelled
    """
    model = OrderItem


    def get_object(self, **kwargs):
        return get_object_or_404(self.model, pk=kwargs.get("id"))

    def post(self, request, *args, **kwargs):
        item = self.get_object(**kwargs)
        item.status="Cancelled"
        item.save()
        return self.get_redirect_url()
        
