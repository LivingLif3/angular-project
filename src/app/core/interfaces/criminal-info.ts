export interface ICriminalInfo {
  title: string | null;
  images: any[] | null;
  age_range: string | null;
  sex: string | null;
  weight: string | null;
  race_raw: string | null;
  nationality: string | null;
  hair_raw: string | null;
  eyes: string | null;
  reward_text: string | null;
  description: string | null;
  added_fields: IFieldInfo
}

interface IFieldData {
  type: string
  value: string | number | boolean
}

interface IFieldInfo {
  [key: string]: IFieldData
}
