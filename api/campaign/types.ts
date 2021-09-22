export type TCampaign = {
  //
}

export type TCampaignList = TCampaign[]

export type TCampaignCreatePayload = {
  [key: string]: any // TODO
}

export interface ICampaignApi {
  list(): Promise<TCampaignList>
  listLoads(): Promise<TCampaignList>
  create(payload: TCampaignCreatePayload): Promise<void>
}
