<VirtualHost *:80>

    # Server name
    ServerName satanbarbara.com 

    # Document root
    DocumentRoot /var/www/satanbarbara.com/www/

    # Custom log file locations
    ErrorLog  /var/www/satanbarbara.com/resources/server/logs/sb.error.log
    CustomLog /var/www/satanbarbara.com/resources/server/logs/sb.access.log combined

</VirtualHost>
