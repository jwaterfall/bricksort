export interface RebrickableSet {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_at: Date;
}

export interface RebrickableSetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RebrickableSet[];
}
