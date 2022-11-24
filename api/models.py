from django.db import models


class Copilot(models.Model):
    id = models.AutoField(primary_key=True)
    textarea_old = models.TextField(max_length=1000, blank=True, null=True)
    textarea_new = models.TextField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.textarea_old
