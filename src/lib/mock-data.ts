export type ClassLevel = "SIL" | "CP" | "CE1" | "CE2" | "CM1" | "CM2";

export const classLevels: ClassLevel[] = ["SIL", "CP", "CE1", "CE2", "CM1", "CM2"];

export const avatars = ["🦁", "🐧", "🦊", "🐼", "🐝", "🐢", "🦉", "🐨"];

export type Subject = {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  progress: number;
  sequences: Sequence[];
};

export type Sequence = {
  id: string;
  index: number;
  title: string;
  chapters: Chapter[];
  locked: boolean;
  progress: number;
};

export type Chapter = { id: string; title: string; lessons: Lesson[] };

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  stars: number;
  state: "done" | "current" | "locked";
};

const seq = (
  subjectId: string,
  index: number,
  title: string,
  progress: number,
  locked: boolean,
  chapters: [string, string[]][],
): Sequence => ({
  id: `${subjectId}-s${index}`,
  index,
  title,
  locked,
  progress,
  chapters: chapters.map(([ctitle, lessons], ci) => ({
    id: `${subjectId}-s${index}-c${ci}`,
    title: ctitle,
    lessons: lessons.map((l, li) => ({
      id: `${subjectId}-s${index}-c${ci}-l${li}`,
      title: l,
      minutes: 5 + ((li * 3) % 7),
      stars: locked ? 0 : progress > (li + 1) * 25 ? 3 : progress > li * 25 ? 1 : 0,
      state: locked
        ? "locked"
        : progress > (li + 1) * 25
          ? "done"
          : progress > li * 25
            ? "current"
            : "locked",
    })),
  })),
});

export const subjects: Subject[] = [
  {
    id: "maths",
    name: "Mathématiques",
    emoji: "🔢",
    gradient: "bg-gradient-play",
    progress: 62,
    sequences: [
      seq("maths", 1, "Les nombres jusqu'à 100", 80, false, [
        ["Lire et écrire les nombres", ["Compter jusqu'à 20", "Compter jusqu'à 100"]],
        ["Comparer les nombres", ["Plus grand, plus petit", "Ranger les nombres"]],
      ]),
      seq("maths", 2, "Additions et soustractions", 45, false, [
        ["Additionner", ["Ajouter en ligne", "Additions posées"]],
        ["Soustraire", ["Retirer une quantité", "Soustractions posées"]],
      ]),
      seq("maths", 3, "Multiplications", 10, false, [
        ["Tables", ["Table de 2", "Table de 5"]],
      ]),
      seq("maths", 4, "Géométrie", 0, true, [["Les formes", ["Carré et rectangle"]]]),
      seq("maths", 5, "Mesures", 0, true, [["Longueurs", ["Le mètre"]]]),
      seq("maths", 6, "Problèmes", 0, true, [["Résoudre", ["Lire un énoncé"]]]),
    ],
  },
  {
    id: "francais",
    name: "Français",
    emoji: "📚",
    gradient: "bg-gradient-cool",
    progress: 38,
    sequences: [
      seq("francais", 1, "L'alphabet et les sons", 70, false, [
        ["Les voyelles", ["a, e, i, o, u", "Les sons simples"]],
        ["Les syllabes", ["Découper les mots"]],
      ]),
      seq("francais", 2, "Lecture de mots", 25, false, [
        ["Mots courants", ["Lire des mots simples"]],
      ]),
      seq("francais", 3, "La phrase", 0, true, [["Construire", ["Majuscule et point"]]]),
      seq("francais", 4, "Grammaire", 0, true, [["Le nom", ["Nom commun"]]]),
      seq("francais", 5, "Orthographe", 0, true, [["Les accords", ["Le pluriel"]]]),
      seq("francais", 6, "Expression écrite", 0, true, [["Écrire", ["Une petite histoire"]]]),
    ],
  },
  {
    id: "anglais",
    name: "Anglais",
    emoji: "🌍",
    gradient: "bg-gradient-berry",
    progress: 20,
    sequences: [
      seq("anglais", 1, "Hello!", 55, false, [
        ["Greetings", ["Say hello", "My name is..."]],
      ]),
      seq("anglais", 2, "Colours & numbers", 5, false, [["Colours", ["Red, blue, green"]]]),
      seq("anglais", 3, "My family", 0, true, [["Family", ["Mother, father"]]]),
      seq("anglais", 4, "At school", 0, true, [["School", ["My classroom"]]]),
      seq("anglais", 5, "Animals", 0, true, [["Animals", ["Farm animals"]]]),
      seq("anglais", 6, "Every day", 0, true, [["Routine", ["I wake up"]]]),
    ],
  },
  {
    id: "informatique",
    name: "Informatique",
    emoji: "💻",
    gradient: "bg-gradient-sun",
    progress: 12,
    sequences: [
      seq("informatique", 1, "Découvrir l'ordinateur", 40, false, [
        ["Les parties", ["L'écran et le clavier"]],
      ]),
      seq("informatique", 2, "La souris", 0, true, [["Cliquer", ["Glisser-déposer"]]]),
      seq("informatique", 3, "Le clavier", 0, true, [["Écrire", ["Les touches"]]]),
      seq("informatique", 4, "Dessiner", 0, true, [["Paint", ["Mes formes"]]]),
      seq("informatique", 5, "Algorithmes", 0, true, [["Les étapes", ["Une recette"]]]),
      seq("informatique", 6, "Internet en sécurité", 0, true, [["Prudence", ["Mes secrets"]]]),
    ],
  },
];

export const getSubject = (id: string): Subject =>
  subjects.find((s) => s.id === id) ?? (subjects[0] as Subject);
export const getSequence = (id: string): { subject: Subject; sequence: Sequence } => {
  for (const s of subjects) {
    const found = s.sequences.find((q) => q.id === id);
    if (found) return { subject: s, sequence: found };
  }
  const first = subjects[0] as Subject;
  return { subject: first, sequence: first.sequences[0] as Sequence };
};

/* ---------------- Lesson Engine : contenu piloté par les données ---------------- */

export type Step =
  | { type: "INTRO"; title: string; text: string; emoji: string }
  | { type: "EXPLANATION"; title: string; text: string; emoji: string }
  | { type: "QCM"; question: string; options: string[]; answer: number }
  | { type: "TRUE_FALSE"; question: string; answer: boolean }
  | { type: "FILL_BLANK"; before: string; after: string; options: string[]; answer: number }
  | { type: "DRAG_DROP"; question: string; items: string[]; order: string[] }
  | { type: "MATCHING"; question: string; pairs: [string, string][] }
  | { type: "CALCULATION"; question: string; answer: number }
  | { type: "RESULT" };

export const lessonById: Record<string, { title: string; subject: string; steps: Step[] }> = {};

export const defaultLesson: { title: string; subject: string; steps: Step[] } = {
  title: "Comparer les nombres",
  subject: "Mathématiques",
  steps: [
    {
      type: "INTRO",
      title: "Comparer les nombres",
      text: "Aujourd'hui, on apprend à dire quel nombre est le plus grand !",
      emoji: "🐘",
    },
    {
      type: "EXPLANATION",
      title: "Le crocodile gourmand",
      text: "Le signe > est une bouche de crocodile : elle s'ouvre toujours vers le plus grand nombre.",
      emoji: "🐊",
    },
    {
      type: "QCM",
      question: "Quel nombre est le plus grand ?",
      options: ["47", "74", "Ils sont égaux"],
      answer: 1,
    },
    {
      type: "DRAG_DROP",
      question: "Range du plus petit au plus grand",
      items: ["18", "9", "31", "24"],
      order: ["9", "18", "24", "31"],
    },
    {
      type: "TRUE_FALSE",
      question: "56 est plus petit que 65",
      answer: true,
    },
    {
      type: "FILL_BLANK",
      before: "12",
      after: "21",
      options: ["<", ">", "="],
      answer: 0,
    },
    {
      type: "MATCHING",
      question: "Associe chaque nombre à son écriture",
      pairs: [
        ["14", "quatorze"],
        ["40", "quarante"],
        ["4", "quatre"],
      ],
    },
    { type: "CALCULATION", question: "23 + 14 = ?", answer: 37 },
    { type: "RESULT" },
  ],
};

/* ---------------- Enfants & parent ---------------- */

export type Child = {
  id: string;
  name: string;
  avatar: string;
  level: ClassLevel;
  xp: number;
  streak: number;
  coins: number;
  minutesToday: number;
  progress: number;
};

export const children: Child[] = [
  {
    id: "c1",
    name: "Amina",
    avatar: "🦊",
    level: "CE1",
    xp: 1840,
    streak: 6,
    coins: 240,
    minutesToday: 24,
    progress: 62,
  },
  {
    id: "c2",
    name: "Junior",
    avatar: "🐧",
    level: "SIL",
    xp: 620,
    streak: 2,
    coins: 90,
    minutesToday: 11,
    progress: 28,
  },
];

export const badges = [
  { emoji: "🏅", name: "Premier pas", unlocked: true },
  { emoji: "🔥", name: "Série de 7", unlocked: true },
  { emoji: "🧮", name: "Roi du calcul", unlocked: true },
  { emoji: "📖", name: "Grand lecteur", unlocked: false },
  { emoji: "🌟", name: "100 étoiles", unlocked: false },
  { emoji: "👑", name: "Champion", unlocked: false },
];

export const leaderboard = [
  { name: "Amina", avatar: "🦊", xp: 1840, me: true },
  { name: "Ngo Bea", avatar: "🦁", xp: 2150, me: false },
  { name: "Éric", avatar: "🐼", xp: 1720, me: false },
  { name: "Salima", avatar: "🐝", xp: 1480, me: false },
  { name: "Kevin", avatar: "🦉", xp: 1210, me: false },
].sort((a, b) => b.xp - a.xp);

export const challenges = [
  { title: "3 leçons aujourd'hui", reward: "+50 XP", progress: 66, kind: "Quotidien" },
  { title: "20 bonnes réponses", reward: "+30 pièces", progress: 40, kind: "Quotidien" },
  { title: "Terminer la séquence 2", reward: "🏅 Badge", progress: 45, kind: "Hebdo" },
];
