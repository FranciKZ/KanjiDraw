export interface IStatisticData {
  created_at: string;
  subject_id: number;
  subject_type: string;
  meaning_correct: number,
  meaning_incorrect: number,
  meaning_max_streak: number,
  meaning_current_streak: number,
  reading_correct: number,
  reading_incorrect: number,
  reading_max_streak: number,
  reading_current_streak: number,
  percentage_correct: number,
  hidden: boolean
}

export interface IStatistics {
  id: number;
  object: string;
  url: string;
  data_updated_at: string;
  data: IStatisticData;
}
