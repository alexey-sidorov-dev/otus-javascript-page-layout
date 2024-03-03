module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
  prompt: {
    messages: {
      skip: "(нажмите Enter для пропуска)",
      max: "(максимум %d символов)",
      min: "(минимум %d символов)",
      emptyWarning: "(%s не может быть пустым)",
      upperLimitWarning: "(%s на %d символов больше максимально возможного)",
      lowerLimitWarning: "(%s на %d символов меньше минимально необходимого)",
    },
    questions: {
      type: {
        description: "Выберите тип изменения, которое вы фиксируете",
        enum: {
          feat: {
            description: "Новый функционал",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "Исправление ошибки",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "Изменения только в документации",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description:
              "Изменения, не влияющие на смысл кода (пробелы, форматирование, отсутствие точек с запятой и т. д.)",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description:
              "Изменение кода, которое не исправляет ошибку и не добавляет новый функционал",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "Изменение кода, повышающее производительность",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description:
              "Добавление отсутствующих тестов или исправление существующих",
            title: "Tests",
            emoji: "🚨",
          },
          build: {
            description:
              "Изменения, влияющие на систему сборки или внешние зависимости",
            title: "Builds",
            emoji: "🛠",
          },
          ci: {
            description: "Изменения в файлах конфигурации и сценариях CI",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          chore: {
            description: "Прочие изменения, которые не меняют код или тесты",
            title: "Chores",
            emoji: "♻️",
          },
          revert: {
            description: "Отмена предыдущего коммита",
            title: "Reverts",
            emoji: "🗑",
          },
        },
      },
      scope: {
        description:
          "Какова область действия этого изменения (например, компонент или имя файла)",
      },
      subject: {
        description: "Напишите краткое описание изменения",
      },
      body: {
        description: "Предоставьте более подробное описание изменения",
      },
      isBreaking: {
        description: "Есть ли в изменении BREAKING CHANGE?",
      },
      breakingBody: {
        description:
          "Для коммита BREAKING CHANGE требуется тело коммита. Пожалуйста, введите более подробное описание самого коммита",
      },
      breaking: {
        description: "Опишите BREAKING CHANGE",
      },
    },
  },
};
