# API

The API will be here.

Refer to the [Getting Started Guide](https://api-platform.com/docs/distribution) for more information.

Pour aller dans le conteneur, utilisez la commande : 
   >  docker exec -it fullstack-lab-php-1 ash

# Migrations de la base de données
Pour créer les tables dans notre base de données executer dans notre conteneur
   > php bin/console make:migration
   > php bin/console doctrine:migrations:generate

# Charger données de test
Pour charger les donnees avec les fichiers telechargés, veuillez d'executer 
veuillez changer la variable $filename pour charger le fichier souhaité
> php bin/console doctrine:fixtures:load

Si vous rencontrez un probleme pour lire un fichier très lourd dans le conteneur
vous pouvez rentrer dans le conteneur, aller dans la config php et configurer la taille de la mémoire souhaitez
    cd /usr/local/etc/php
    echo 'memory_limit = 6000M' >> php.ini

    ---

## Exécution des Tests

Créer une base de données de test :
```shell
docker compose exec php bin/console doctrine:database:create --env=test
```

Migration :
```shell
 docker compose exec php bin/console doctrine:schema:create --env=test
 docker compose exec php bin/console doctrine:migrations:migrate --env=test
```

Exécuter les tests :
```Shell
compose exec php bin/phpunit tests/Api/
```

Supprimer la base de données de test :
```shell
docker compose exec php bin/console doctrine:database:drop --force --env=test
```