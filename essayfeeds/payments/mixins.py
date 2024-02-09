from django.http import HttpResponseRedirect
from django.views.generic import View


class SuccessRedirectView(View):
    def get_redirect_url(self):
        return HttpResponseRedirect(self.request.META.get("HTTP_REFERER"))