from django.db import models

PROGR_LAN = [
    ('Python', 'Python'),
    ('Kotlin', 'Kotlin'),
    ('JavaScript', 'JavaScript'),
]


class Copilot(models.Model):
    id = models.AutoField(primary_key=True)
    progr_lan = models.TextField(choices=PROGR_LAN, max_length=1000)
    textarea_old = models.TextField(max_length=1000, blank=True, null=True)
    textarea_new = models.TextField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.textarea_old
