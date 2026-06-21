# First In

Vroege aankomers op het werk verdienen erkenning. *First In* is een website die dat viert via confessions, reviews en een galerij.

## Live

[https://cleocoppens2.be/integratie2/](https://cleocoppens2.be/integratie2/)

## Lokaal draaien

Vereisten: Docker Desktop

```bash
docker compose up
```

Bezoek daarna [http://localhost](http://localhost).

Database-beheer via phpMyAdmin: [http://localhost:8080](http://localhost:8080)

### Database vullen

```bash
# Tabellen aanmaken
docker exec -i cleo-mysql-1 mysql -uroot -pdevine4life first_in < database/database.sql

# Dummy data toevoegen
docker exec -i cleo-mysql-1 mysql -uroot -pdevine4life first_in < database/seeds.sql
```

## Deployment (Combell)

| | |
|---|---|
| **URL** | https://cleocoppens2.be/testtttt/ |
| **DB host** | ID433617_integratie2.db.webhosting.be |
| **DB naam** | ID433617_integratie2 |
| **DB gebruiker** | ID433617_integratie2 |

Pas `config/database.php` aan voor Combell:

```php
$pdo = new PDO(
    'mysql:host=ID433617_integratie2.db.webhosting.be;dbname=ID433617_integratie2;charset=utf8mb4',
    'ID433617_integratie2',
    '<wachtwoord>',
    ...
);
```

## Structuur

```
controllers/   — request-afhandeling (MVC Controller)
models/        — database-logica (MVC Model)
api/           — URL-entry-points (thin dispatchers)
js/            — client-side JavaScript (ES modules)
css/           — stylesheets (BEM)
assets/        — afbeeldingen en lettertypes
database/      — database.sql (schema) + seeds.sql (dummy data)
```
