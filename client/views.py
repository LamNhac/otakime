from django.shortcuts import render
from django.contrib.sites.shortcuts import get_current_site
import requests
http = "http://"


def home(request):
    HOST = http + str(get_current_site(request))
    response = requests.get(f'{HOST}/api/movie')
    data = response.json()
    return render(request=request, template_name='home.html', context={"data":data })
