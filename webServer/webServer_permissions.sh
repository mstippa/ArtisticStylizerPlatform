#!/bin/bash
find www/ -type d -exec chmod 775 {} \;
find www/ -type f -exec chmod 775 {} \;
chown -R sysadmin:sysadmin www/
