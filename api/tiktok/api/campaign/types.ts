import { TPageInfo } from '../../types'
import {
  EAdvertisingObjective,
  EAdvertisingStatus,
  EBudgetMode,
  ECampaignType,
  EOperationStatus,
  ESplitTestVariable,
} from '../../types/enums'

enum ECampaignFields {
  Id = 'campaign_id',
  Name = 'campaign_name',
  AdvertiserId = 'advertiser_id',
  Budget = 'budget',
  BudgetMode = 'budget_mode',
  Status = 'status',
  OptStatus = 'opt_status',
  Objective = 'objective',
  ObjectiveType = 'objective_type',
  CreateTime = 'create_time',
  ModifyTime = 'modify_time',
  IsNewStructure = 'is_new_structure',
  SplitTestVariable = 'split_test_variable',
}

export type TCampaignListPayload = {
  advertiser_id: string // Это Workaround для больших чисел. На самом деле тут bigint

  /**
   * Return field, optional values. When not specified, all fields are returned by default.
   */
  fields?: ECampaignFields[]

  /**
   * Current page number. Default value: 1, value range: ≥ 1.
   */
  page?: number

  /**
   * Page size, Default value: 10，Range of values: 1-1000.
   */
  page_size?: number

  /**
   * Filters on the data. This parameter is an array of filter objects.
   */
  filtering?: {
    /**
     * Campaign IDs. Up to 100 items.
     */
    campaign_ids?: string[]

    /**
     * Filter by campaign name, supports fuzzy matching (name contains passed data).
     */
    campaign_name?: string

    /**
     * Campaign Type. Regular or iOS 14 campaign.
     */
    campaign_type?: ECampaignType

    /**
     * Filter by Ad objectives.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    objective_type?: EAdvertisingObjective

    /**
     * Filter by Ad status.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    primary_status?: EAdvertisingStatus

    /**
     * Secondary status.
     * TODO
     * @deprecated
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    status?: string
  }
}

// TODO попробовать переделать все типы на интерфейсы, а где нужно - extends IPageInfo
// TODO посмотреть, что из этого обязательное, а что нет
export type TCampaignListResponse = {
  list: {
    campaign_id: string
    campaign_name: string
    campaign_type?: ECampaignType
    advertiser_id: string
    budget: number
    budget_mode: EBudgetMode
    opt_status: EOperationStatus
    objective_type: EAdvertisingObjective
    split_test_variable: ESplitTestVariable
    is_new_structure: boolean
    create_time: string
    modify_time: string

    /**
     * Secondary status.
     * @deprecated
     */
    status?: string

    /**
     * Campaign Type, optional values include: APP (application), LANDING_PAGE (landing page).
     * @deprecated
     */
    objective?: 'APP' | 'LANDING_PAGE'
  }[]
  page_info: TPageInfo
}

export type TCampaignCreatePayload = {
  advertiser_id: string

  /**
   * Campaign name.
   * Max 512 chars, emoji not allowed.
   */
  campaign_name: string

  /**
   * Campaign budget.
   * Required when 'budget_mode' is 'BUDGET_MODE_DAY' or 'BUDGET_MODE_TOTAL'.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100532}
   */
  budget: number

  /**
   * Budget type.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
   */
  budget_mode: EBudgetMode

  /**
   * Advertising objective.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
   */
  objective_type: EAdvertisingObjective

  /**
   * Split-test target.
   *
   * NOTE: Once the Split Test variable is set, it cannot be modified.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1692746716091393}
   */
  split_test_variable?: ESplitTestVariable
}

export type TCampaignCreateResponse = {
  campaign_id: bigint
}
