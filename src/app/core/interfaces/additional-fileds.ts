import {ICriminalInfo} from "./criminal-info";

export interface IField {
  name: string,
  value: string | boolean | number
}

export interface IAdditionalFieldsInfo {
  key: string,
  value: string | number | boolean,
  type: string
}

export interface IAdditionalFields {
  key: string,
  value: Partial<IAdditionalFieldsInfo>
}

export interface IAdditionalFieldsFull {
  [key: string]: Partial<IAdditionalFieldsInfo>
}
export interface InfoCard extends ICriminalInfo {
  ['@id']: string,
  race: string,
  images: any
}
