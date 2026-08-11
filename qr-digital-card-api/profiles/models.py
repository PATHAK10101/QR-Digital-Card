from uuid import uuid4

from django.core.validators import MaxLengthValidator
from django.db import models


def generate_slug():
    return uuid4().hex[:12]


class Profile(models.Model):
    slug = models.CharField(
        max_length=12,
        unique=True,
        db_index=True,
        editable=False,
    )

    name = models.CharField(
        max_length=100,
        blank=True,
    )

    role = models.CharField(
        max_length=150,
        blank=True,
    )

    company = models.CharField(
        max_length=150,
        blank=True,
    )

    bio = models.TextField(
        blank=True,
        validators=[
            MaxLengthValidator(500),
        ],
    )

    email = models.EmailField(
        blank=True,
    )

    phone = models.CharField(
        max_length=30,
        blank=True,
    )

    location = models.CharField(
        max_length=150,
        blank=True,
    )

    github = models.URLField(
        blank=True,
    )

    linkedin = models.URLField(
        blank=True,
    )

    website = models.URLField(
        blank=True,
    )

    photo = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            slug = generate_slug()

            while Profile.objects.filter(
                slug=slug
            ).exists():
                slug = generate_slug()

            self.slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name or 'Unnamed'} — {self.slug}"