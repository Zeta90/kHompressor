#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.core.wsgi import get_wsgi_application

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'khompressor.settings')

    if os.environ.get('DJANGO_DEBUG', False):  # You can use django.conf settings.DEBUG
        import ptvsd
        ptvsd.enable_attach(address=('localhost', 8000))
        ptvsd.wait_for_attach()  # We can remove this line it gives you trouble,
                                # but it's good to know if the debugger started or not
                                # blocking the execution for a while :-)
        application = get_wsgi_application()

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
