export const STATUS_OPTIONS = [
  {
    value: "En attente",
    color:
      "bg-amber-200 text-amber-900 dark:bg-amber-500/30 dark:text-amber-100 border border-amber-300 dark:border-amber-500/60",
  },
  {
    value: "Entretien",
    color:
      "bg-sky-200 text-sky-900 dark:bg-sky-500/30 dark:text-sky-100 border border-sky-300 dark:border-sky-500/60",
  },
  {
    value: "Test technique",
    color:
      "bg-violet-200 text-violet-900 dark:bg-violet-500/30 dark:text-violet-100 border border-violet-300 dark:border-violet-500/60",
  },
  {
    value: "Acceptée",
    color:
      "bg-emerald-200 text-emerald-900 dark:bg-emerald-500/30 dark:text-emerald-100 border border-emerald-300 dark:border-emerald-500/60",
  },
  {
    value: "Refusée",
    color:
      "bg-rose-200 text-rose-900 dark:bg-rose-500/30 dark:text-rose-100 border border-rose-300 dark:border-rose-500/60",
  },
  {
    value: "Abandonnée",
    color:
      "bg-slate-200 text-slate-800 dark:bg-slate-700/40 dark:text-slate-100 border border-slate-300 dark:border-slate-500/60",
  },
  {
    value: "Relancée",
    color:
      "bg-indigo-200 text-indigo-900 dark:bg-indigo-500/30 dark:text-indigo-100 border border-indigo-300 dark:border-indigo-500/60",
  },
];

const STATUS_ALIASES = {
  Accepté: "Acceptée",
  Refusé: "Refusée",
  Abandonné: "Abandonnée",
  "Test Technique": "Test technique",
  "test technique": "Test technique",
};

export const normalizeStatus = (status) =>
  STATUS_ALIASES[status] || status;

export const STATUS_ORDER = {
  Acceptée: 0,
  Entretien: 1,
  "Test technique": 2,
  Relancée: 3,
  "En attente": 4,
  Refusée: 5,
  Abandonnée: 6,
};

export const INACTIVE_STATUSES = ["Refusée", "Abandonnée"];

export const METHOD_OPTIONS = [
  "Email",
  "Téléphone",
  "LinkedIn",
  "Courrier",
  "Autre",
];

export const EMPTY_FORM = {
  companyName: "",
  jobTitle: "",
  status: "En attente",
  location: "",
  salary: "",
  source: "",
  applicationUrl: "",
  notes: "",
  dateApplication: new Date().toISOString().split("T")[0],
  priority: "",
};

export const EMPTY_RELAUNCH_FORM = {
  date: new Date().toISOString().split("T")[0],
  method: "",
  notes: "",
  response: "",
};

export const COLUMNS = [
  { key: "companyName", label: "Entreprise", sortable: true },
  { key: "jobTitle", label: "Poste", sortable: true },
  { key: "status", label: "Statut", sortable: true },
  { key: "location", label: "Lieu", sortable: true },
  { key: "salary", label: "Salaire", sortable: true },
  { key: "source", label: "Source", sortable: true },
  { key: "priority", label: "Priorité", sortable: true },
  { key: "dateApplication", label: "Date candidature", sortable: true },
  { key: "timeBetween", label: "", sortable: true },
  { key: "lastRelaunch", label: "Dernière Relance", sortable: true },
  { key: "relaunches", label: "Relances", sortable: true },
  { key: "applicationUrl", label: "Lien", sortable: false },
];
