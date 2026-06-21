-- ============================================================
-- First In — seed data
-- Voer uit na database.sql:  mysql -u root -p < seeds.sql
-- ============================================================

USE integratie2;

-- ----------------------------- confessions -----------------------------
INSERT INTO confessions (location, content, recognition_count, created_at) VALUES
  ('Gent',      'Ik heb al drie keer dezelfde mok afgewassen voor iemand anders hem kon pakken.',                                  203, '2026-06-20 07:41:00'),
  ('Antwerpen', 'Ik geniet stiekem van de lift helemaal voor mezelf alleen.',                                                      188, '2026-06-20 06:58:00'),
  ('Leuven',    'De printer aanzetten voelt elke ochtend als een klein ritueel.',                                                  164, '2026-06-20 07:12:00'),
  ('Brussel',   'Ik weet exact welke trede kraakt en vermijd hem uit gewoonte.',                                                   142, '2026-06-20 07:03:00'),
  ('Brugge',    'Het eerste licht aandoen voelt alsof het kantoor van mij is.',                                                    130, '2026-06-20 06:47:00'),
  ('Gent',      'Elke ochtend doe ik alle lichten aan en geniet van de stilte voor de rest aankomt. Even van mij.',                  0, '2026-06-20 07:55:00');

-- ----------------------------- reviews --------------------------------
INSERT INTO reviews (author, location, stars, quote, anonymous, created_at) VALUES
  ('Lena V.',   'Brussel', 5, 'Ik dacht altijd dat vroeg opstaan zinloos was. Nu is het het beste deel van mijn dag. First In heeft me laten zien dat ik helemaal niet de enige vroege vogel ben op kantoor!', 0, '2026-06-15 09:00:00'),
  ('Thomas D.', 'Gent',    4, 'Eindelijk een reden om de snooze-knop te negeren. Via First In heb ik mensen leren kennen die ik anders nooit had gesproken. Het koppelsysteem werkt verrassend goed.',        0, '2026-06-14 09:00:00'),
  ('Sara M.',   'Leuven',  5, 'Ik was sceptisch over die vroege uurtjes op kantoor, maar het werd al snel een van mijn favoriete momenten — vooral door de mensen die je leert kennen.',                      0, '2026-06-13 09:00:00');

-- gallery_photos: niet geseed — afbeeldingsbestanden moeten handmatig
-- gekopieerd worden naar uploads/ op de nieuwe server.
