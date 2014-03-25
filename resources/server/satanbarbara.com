<VirtualHost *:80>

    # Server name
    ServerName satanbarbara.com 
    ServerAlias www.satanbarbara.com

    # Document root
    DocumentRoot /var/www/satanbarbara.com/www/

    <Directory var/www/satanbarbara.com/www> 
	 AllowOverride All
	 Options +FollowSymLinks
	 Order allow,deny 
	 Allow from all

         DirectoryIndex index.php index.html
    </Directory>

    # Custom log file locations
    ErrorLog  /var/www/satanbarbara.com/resources/server/logs/sb.error.log
    CustomLog /var/www/satanbarbara.com/resources/server/logs/sb.access.log combined

</VirtualHost>
