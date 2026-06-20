<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/models/Confession.php';

try {
    $confessions = Confession::orderBy('created_at', 'desc')->limit(10)->get();
} catch (\Exception $e) {
    $confessions = collect([]);
}

$fallback = [
    ['meta' => '7u41 &middot; Gent',      'text' => 'Ik heb al drie keer dezelfde mok afgewassen voor iemand anders hem kon pakken.', 'count' => 203],
    ['meta' => '6u58 &middot; Antwerpen', 'text' => 'Ik geniet stiekem van de lift helemaal voor mezelf alleen.',                    'count' => 187],
    ['meta' => '7u12 &middot; Leuven',    'text' => 'De printer aanzetten voelt elke ochtend als een klein ritueel.',                'count' => 164],
    ['meta' => '7u03 &middot; Brussel',   'text' => 'Ik weet exact welke trede kraakt en vermijd hem uit gewoonte.',                 'count' => 142],
    ['meta' => '6u47 &middot; Brugge',    'text' => 'Het eerste licht aandoen voelt alsof het kantoor van mij is.',                  'count' => 129],
];

?>
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>First in Jij komt altijd als eerste</title>
  <meta name="description" content="First In koppelt mensen die als eerste op kantoor toekomen. Vind jouw First Table en begin je ochtend samen.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,800;0,900;1,500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a class="skip-link" href="#main">Naar de inhoud</a>

  <main id="main">

    <!-- ============================ HERO ============================ -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__inner">
        <h1 class="hero__title" id="hero-title">
          <span class="hero__line">Jij komt</span>
          <span class="hero__line hero__line--indent">
            <mark class="hero__mark">altijd</mark>
            <em class="hero__accent">als eerste</em>
          </span>
          <span class="hero__line">Je bent niet</span>
          <span class="hero__line hero__line--indent">de <em class="hero__accent">enige</em></span>
        </h1>

        <p class="hero__lead">
          Ergens in de stad stapt nu iemand een leeg kantoor binnen. Licht flikkert aan.
          Koffie wordt gezet. Stilte. Die persoon ben jij nog niet, maar jullie begrijpen
          elkaar perfect.
        </p>

        <div class="hero__actions">
          <a class="button button--primary" href="#concept">Vind jouw First Table&nbsp;&rarr;</a>
          <a class="button button--ghost" href="#concept">Hoe werkt het?</a>
        </div>

        <!-- decoratieve cut-outs: background-image, niet inhoudelijk -->
        <span class="deco deco--lamp" aria-hidden="true"></span>
        <span class="deco deco--plant" aria-hidden="true"></span>
        <span class="deco deco--mouse" aria-hidden="true"></span>
        <span class="deco deco--pencils" aria-hidden="true"></span>
      </div>
    </section>

    <!-- ========================== SFEERBEELDEN ========================== -->
    <section class="gallery" aria-labelledby="gallery-title">
      <header class="section-head">
        <p class="eyebrow">Sfeerbeelden</p>
        <h2 class="section-head__title" id="gallery-title">Beelden uit <em>jouw</em> uur.</h2>
        <p class="section-head__hint" aria-hidden="true">Scroll&nbsp;&#8614;</p>
      </header>

      <div class="carousel" data-carousel>
        <ul class="carousel__track gallery__list" data-carousel-track>
          <li class="gallery__item">
            <img class="gallery__img" src="assets/img/sfeer-1.jpg" alt="Leeg café-interieur in het vroege ochtendlicht" width="280" height="340" loading="lazy">
          </li>
          <li class="gallery__item">
            <img class="gallery__img" src="assets/img/sfeer-2.jpg" alt="Iemand zet koffie in een stille keuken" width="280" height="340" loading="lazy">
          </li>
          <li class="gallery__item">
            <img class="gallery__img" src="assets/img/sfeer-3.jpg" alt="Persoon lacht achter een laptop bij zonsopgang" width="280" height="340" loading="lazy">
          </li>
          <li class="gallery__item gallery__item--empty" aria-hidden="true"></li>
          <li class="gallery__item gallery__item--empty" aria-hidden="true"></li>
          <li class="gallery__item gallery__item--empty" aria-hidden="true"></li>
        </ul>

        <div class="carousel__controls" data-carousel-controls hidden>
          <button class="carousel__button" type="button" data-carousel-prev aria-label="Vorige beelden">&larr;</button>
          <button class="carousel__button" type="button" data-carousel-next aria-label="Volgende beelden">&rarr;</button>
        </div>
      </div>
    </section>

    <!-- ============================ LIVE NU ============================ -->
    <section class="live" aria-labelledby="live-title">
      <div class="live__inner">
        <header class="section-head section-head--on-dark">
          <p class="eyebrow">Live nu</p>
          <h2 class="section-head__title" id="live-title">
            Op dit moment ook <mark class="mark--aqua">vroeg</mark> op kantoor
          </h2>
          <p class="section-head__text">
            Ergens in België zit nu iemand ook alleen achter een laptop. Nog voor de rest aankomt.
          </p>
        </header>

        <div class="live__grid">
          <p class="counter">
            <span class="counter__value" data-counter aria-live="polite">248</span>
            <span class="counter__label">Live bijgewerkt</span>
          </p>

          <article class="live-card">
            <h3 class="live-card__title">Mensen zijn nu <em>First In</em>.</h3>
            <p class="live-card__text">
              Ze kennen elkaar niet. Ze kennen jou niet. Maar ze begrijpen exact hoe jij je voelt.
            </p>
            <ul class="live-card__tags">
              <li class="tag">Gent 48</li>
              <li class="tag">Brussel 65</li>
              <li class="tag">Antwerpen 32</li>
              <li class="tag">Leuven 34</li>
              <li class="tag">Brugge 9</li>
            </ul>
          </article>
        </div>

        <span class="deco deco--flowers" aria-hidden="true"></span>
        <span class="deco deco--markers" aria-hidden="true"></span>
      </div>
    </section>

    <!-- ============================ HET CONCEPT ============================ -->
    <section class="concept" id="concept" aria-labelledby="concept-title">
      <header class="section-head">
        <p class="eyebrow">Het concept</p>
        <h2 class="section-head__title" id="concept-title">Zo werkt de <em>First Table</em>?</h2>
        <p class="section-head__hint" aria-hidden="true">Scroll&nbsp;&#8614;</p>
        <span class="deco deco--clock" aria-hidden="true"></span>
      </header>

      <div class="carousel" data-carousel>
        <ol class="carousel__track concept__track" data-carousel-track>
          <li class="step-card">
            <span class="step-card__number">1</span>
            <h3 class="step-card__title">Meld je aan</h3>
            <p class="step-card__text">Vul je aankomsttijd, stad en early type in. Wij zoeken jouw match.</p>
          </li>
          <li class="step-card">
            <span class="step-card__number">2</span>
            <h3 class="step-card__title">Wij koppelen</h3>
            <p class="step-card__text">Op basis van jouw uur en stad linken we je aan iemand met hetzelfde ritme.</p>
          </li>
          <li class="step-card">
            <span class="step-card__number">3</span>
            <h3 class="step-card__title">Jij arriveert</h3>
            <p class="step-card__text">Jij stapt binnen en bent niet langer de enige. Jullie ochtend begint samen.</p>
          </li>
        </ol>

        <div class="carousel__controls" data-carousel-controls hidden>
          <button class="carousel__button" type="button" data-carousel-prev aria-label="Vorige stap">&larr;</button>
          <button class="carousel__button" type="button" data-carousel-next aria-label="Volgende stap">&rarr;</button>
        </div>
      </div>
    </section>

    <!-- ====================== OCHTEND-CONFESSIONAL ====================== -->
    <section class="confessions" aria-labelledby="confessions-title">
      <div class="confessions__inner">
        <header class="section-head section-head--on-dark">
          <p class="eyebrow">Ochtend-confessional</p>
          <h2 class="section-head__title" id="confessions-title">
            Jij bent niet de <mark class="mark--aqua">enige</mark> die dit denkt.
          </h2>
          <p class="section-head__text">
            Deel anoniem jouw meest herkenbare First In-moment. Anderen reageren met een vinkje
            als ze het herkennen.
          </p>
          <span class="deco deco--books" aria-hidden="true"></span>
        </header>

        <div class="feed">
          <ul class="feed__list" data-feed>
            <?php foreach ($confessions as $c): ?>
            <li class="confession">
              <span class="confession__meta"><?= date('G\ui', strtotime($c->created_at)) ?> &middot; <?= htmlspecialchars($c->location) ?></span>
              <p class="confession__text"><?= htmlspecialchars($c->content) ?></p>
              <button class="confession__recognise" type="button"><span aria-hidden="true">&check;</span> <span data-recognise-count><?= (int) $c->recognition_count ?></span></button>
            </li>
            <?php endforeach; ?>
            <?php foreach ($fallback as $item): ?>
            <li class="confession">
              <span class="confession__meta"><?= $item['meta'] ?></span>
              <p class="confession__text"><?= htmlspecialchars($item['text']) ?></p>
              <button class="confession__recognise" type="button"><span aria-hidden="true">&check;</span> <span data-recognise-count><?= $item['count'] ?></span></button>
            </li>
            <?php endforeach; ?>
          </ul>

          <form class="confession-form" action="confession.php" method="post" novalidate>
            <label class="visually-hidden" for="confession-location">Jouw stad</label>
            <select class="confession-form__location" id="confession-location" name="location" required>
              <option value="">Stad&hellip;</option>
              <option>Antwerpen</option>
              <option>Brugge</option>
              <option>Brussel</option>
              <option>Gent</option>
              <option>Hasselt</option>
              <option>Kortrijk</option>
              <option>Leuven</option>
              <option>Liège</option>
              <option>Mechelen</option>
              <option>Namen</option>
              <option>Oostende</option>
              <option>Roeselare</option>
              <option>Sint-Niklaas</option>
              <option>Turnhout</option>
            </select>
            <label class="visually-hidden" for="confession-input">Jouw ochtendmoment</label>
            <input class="confession-form__input" type="text" id="confession-input" name="moment"
                   placeholder="Jouw ochtendmoment&hellip;" maxlength="160" required>
            <button class="button button--primary" type="submit">Versturen</button>
          </form>
        </div>
      </div>
    </section>

    <!-- ============================== QUIZ ============================== -->
    <section class="quiz" aria-labelledby="quiz-title">
      <header class="section-head">
        <p class="eyebrow">Doe mee</p>
        <h2 class="section-head__title" id="quiz-title">Ontdek jouw <em class="accent--multi">early type</em>.</h2>
        <span class="deco deco--markers-2" aria-hidden="true"></span>
      </header>

      <form class="quiz-card" action="quiz.php" method="post" data-quiz novalidate>
        <fieldset class="quiz-card__step" data-quiz-step>
          <legend class="quiz-card__question">
            Wat doe je als <em>allereerste</em> als je binnenstapt?
          </legend>
          <p class="quiz-card__hint">Vier vragen, eerlijk antwoorden, één type.</p>

          <div class="quiz-card__options">
            <label class="option">
              <input class="option__input" type="radio" name="q1" value="koffie" required>
              <span class="option__label">A. Koffie zetten</span>
            </label>
            <label class="option">
              <input class="option__input" type="radio" name="q1" value="plannen">
              <span class="option__label">B. Mijn dag plannen</span>
            </label>
            <label class="option">
              <input class="option__input" type="radio" name="q1" value="staren">
              <span class="option__label">C. Even uit het raam staren</span>
            </label>
            <label class="option">
              <input class="option__input" type="radio" name="q1" value="stilte">
              <span class="option__label">D. Stilte opsnuiven</span>
            </label>
          </div>
        </fieldset>

        <button class="button button--primary quiz-card__next" type="submit" data-quiz-next>volgende</button>
      </form>
    </section>

    <!-- ============================= REVIEWS ============================= -->
    <section class="reviews" aria-labelledby="reviews-title">
      <header class="section-head">
        <p class="eyebrow">Reviews</p>
        <h2 class="section-head__title" id="reviews-title">Zo vinden <em>andere</em> het.</h2>
      </header>

      <div class="carousel" data-carousel>
        <ul class="carousel__track reviews__track" data-carousel-track>
          <li class="review">
            <p class="review__stars"><span role="img" aria-label="5 op 5 sterren">&#9733;&#9733;&#9733;&#9733;&#9733;</span></p>
            <blockquote class="review__quote">
              Ik dacht altijd dat vroeg opstaan zinloos was. Nu is het het beste deel van mijn dag.
              First In heeft me laten zien dat ik helemaal niet de enige vroege vogel ben op kantoor!
            </blockquote>
            <cite class="review__author">Lena V., Brussel</cite>
          </li>
          <li class="review">
            <p class="review__stars"><span role="img" aria-label="4 op 5 sterren">&#9733;&#9733;&#9733;&#9733;&#9734;</span></p>
            <blockquote class="review__quote">
              Eindelijk een reden om de snooze-knop te negeren. Via First In heb ik mensen leren kennen
              die ik anders nooit had gesproken. Het koppelsysteem werkt verrassend goed.
            </blockquote>
            <cite class="review__author">Thomas D., Gent</cite>
          </li>
          <li class="review">
            <p class="review__stars"><span role="img" aria-label="2 op 5 sterren">&#9733;&#9733;&#9734;&#9734;&#9734;</span></p>
            <blockquote class="review__quote">
              Ik was sceptisch over die vroege uurtjes op kantoor, maar het werd al snel een van mijn
              favoriete momenten — vooral door de mensen die je leert kennen.
            </blockquote>
            <cite class="review__author">Sara M., Leuven</cite>
          </li>
        </ul>

        <div class="carousel__controls" data-carousel-controls hidden>
          <button class="carousel__button" type="button" data-carousel-prev aria-label="Vorige review">&larr;</button>
          <button class="carousel__button" type="button" data-carousel-next aria-label="Volgende review">&rarr;</button>
        </div>
      </div>
    </section>

    <!-- ============================= CONTACT ============================= -->
    <section class="contact" aria-labelledby="contact-title">
      <header class="section-head">
        <p class="eyebrow">Contact</p>
        <h2 class="section-head__title" id="contact-title">Stel hier <em>jouw vragen</em>.</h2>
        <span class="deco deco--scanner" aria-hidden="true"></span>
      </header>

      <form class="contact-form" action="contact.php" method="post" novalidate>
        <div class="field">
          <label class="field__label" for="name">Naam:</label>
          <input class="field__input" type="text" id="name" name="name" autocomplete="name" required>
          <p class="field__error" data-error-for="name" hidden></p>
        </div>

        <div class="field">
          <label class="field__label" for="phone">Telefoonnummer:</label>
          <input class="field__input" type="tel" id="phone" name="phone" autocomplete="tel"
                 inputmode="tel" pattern="[0-9+\s()/-]{8,20}" required>
          <p class="field__error" data-error-for="phone" hidden></p>
        </div>

        <div class="field">
          <label class="field__label" for="email">E-mailadres:</label>
          <input class="field__input" type="email" id="email" name="email" autocomplete="email" required>
          <p class="field__error" data-error-for="email" hidden></p>
        </div>

        <div class="field">
          <label class="field__label" for="question">Jouw vraag:</label>
          <textarea class="field__input field__input--area" id="question" name="question" rows="4" required></textarea>
          <p class="field__error" data-error-for="question" hidden></p>
        </div>

        <button class="button button--primary contact-form__submit" type="submit">Versturen</button>
      </form>
    </section>

  </main>

  <footer class="site-footer">
    <p class="site-footer__text">Developed with <span aria-hidden="true">&#128154;</span><span class="visually-hidden">liefde</span> by Cleo Coppens</p>
  </footer>

  <script type="module" src="js/main.js"></script>
</body>
</html>
