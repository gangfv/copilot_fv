from django.views.generic import TemplateView


class HomePageView(TemplateView):
    template_name = "pages/home.html"


class CodePageView(TemplateView):
    template_name = "pages/code.html"

