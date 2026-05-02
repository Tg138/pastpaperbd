export type SubjectSlug = "biology";
export type Year = 2022 | 2023 | 2024;
export type PaperNumber = 1 | 2 | 3;

export interface Subject {
  slug: SubjectSlug;
  name: string;
  code: string;
}

export interface Paper {
  subject: SubjectSlug;
  year: Year;
  paperNumber: PaperNumber;
  qpPath: string;
  msPath: string;
  erPath: string;
}

export interface Question {
  id: string;
  paperId: string;
  number: string;
  marks: number;
  pageNumber?: number;
  specPoints: string[];
}

export interface SpecPoint {
  id: string;
  title: string;
  topic: string;
  parentId?: string;
  description: string;
  breakdown?: string;
  pageNumber?: number;
}

export interface RelatedNote {
  slug: string;
  title: string;
  topic: string;
  sectionTitle?: string;
  sectionAnchor?: string;
}

export interface Breakdown {
  questionId: string;
  msAnswer: string;
  whyExplanation: string;
  specLinks: string[];
  commonMistakes?: string;
}

export function paperId(subject: SubjectSlug, year: Year, paperNumber: PaperNumber): string {
  return `${subject}-${year}-p${paperNumber}`;
}

export function questionId(pid: string, number: string): string {
  return `${pid}-q${number}`;
}
