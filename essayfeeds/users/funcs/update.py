
from essayfeeds.users.models import Profile, User
from django.contrib import messages
from django.http import HttpResponseRedirect


def update_profile_name(request):
    profile = Profile.objects.get(user=request.user)
    if request.method == "POST":
        name = request.POST.get("new_name")
        profile.full_name = name
        profile.save()
        messages.success(request, "Username updated successfully")
        return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
    

def update_profile_phone_number(request):
    profile = Profile.objects.get(user=request.user)
    if request.method == "POST":
        phone_number = request.POST.get("phone_number")
        profile.phone_number = phone_number
        profile.save()
        messages.success(request, "Phone updated successfully")
        return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
    
def update_user_email(request):
    users = User.objects.all()
    user = request.user
    if request.method == "POST":
        email = request.POST.get("new_email")
        if not users.filter(email=email).exists():
            user.email=email
            user.save()
            messages.success(request, "Email updated successfully")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
        messages.error(request, f"Could not updated email to {email}.ALready taken!")
        return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
    
def update_user_password(request):

    user = request.user
    if request.method == "POST":
        password = request.POST.get("current_password")
        password1 = request.POST.get("new_password1")
        password2 = request.POST.get("new_password1")
        # 
        if user.check_password(password):
            # 
            if password1 == password2:
                user.set_password(password1)
                # 
                messages.success(request, "Password changed successfully")
                return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
                # 
            messages.error(request, "Password change was unsuccessful. Please try again latter!")
            return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
        
        messages.error(request, "Password Uncsuccessfull. Please try again latter!")
        return HttpResponseRedirect(request.META.get("HTTP_REFERER"))

