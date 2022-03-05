export interface ISummaryData {
  available_at: string;
  subject_ids: number[];
}
export interface ISummary {
  next_reviews_at: string;
  lessons: ISummaryData[];
  reviews: ISummaryData[];
}

export interface ISummaryResponse {
  object: string;
  url: string;
  data_updated_at: string;
  data: ISummary;
}
