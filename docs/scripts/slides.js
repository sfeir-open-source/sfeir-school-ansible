// One method per module
function schoolSlides() {
  return [
    '00-school/00-TITLE.md',
    '00-school/speaker-jef.md'
  ];
}

function introSlides() {
  return [
    'intro/00-TITLE.md'
  ];
}

function configSlides() {
  return [
    'config/00-TITLE.md',
    'config/01-QUIZZ.md',
    'config/02-LAB.md'
  ];
}

function conceptSlides() {
  return [
    'concepts/00-TITLE.md',
    'concepts/01-QUIZZ.md',
    'concepts/02-LAB.md'
  ];
}

function syntaxSlides() {
  return [
    'syntaxe/00-TITLE.md',
    'syntaxe/01-QUIZZ.md',
    'syntaxe/02-LAB.md'
  ];
}

function testsSlides() {
  return [
    'tests_strategies/00-TITLE.md',
    'tests_strategies/01-QUIZZ.md',
    'tests_strategies/02-LAB.md',
  ];
}

function coopSlides() {
  return[
    'coop/00-TITLE.md',
    'coop/01-QUIZZ.md',
    'coop/02-LAB.md'
  ]
}

function prodSlides() {
  return[
    'production/00-TITLE.md',
    'production/01-QUIZZ.md',
    'production/02-LAB.md'
  ]
}

function linkSlides() {
  return[
    'links/00-TITLE.md'
  ]
}

function formation() {
  return [
    ...schoolSlides(),
    ...introSlides(),
    ...configSlides(),
    ...conceptSlides(),
    ...syntaxSlides(),
    ...testsSlides(),
    ...coopSlides(),
    ...prodSlides(),
    ...linkSlides()
  ].map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
}
