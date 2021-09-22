// TODO ой лол, надо всё это дело свернуть в import * as Enums from '../../types/enums'
import { TPageInfo } from '../../types'
import {
  EActionScene,
  EAdGroupStatus,
  EAdvertisingObjective,
  EAdvertisingStatus,
  EAppEvent,
  EAppSecondaryGoalEvent,
  EAudienceAgeRange,
  EAudienceAndroidVersion,
  EAudienceGender,
  EAudienceIOSVersion,
  EAudienceLanguage,
  EAudienceNetworkType,
  EAudienceOS,
  EAudienceType,
  EBiddingDeepEvent,
  EBiddingStrategy,
  EBillingEvent,
  EBudgetMode,
  EConversionWindow,
  ECreativeDeliveryMode,
  ECreatorRelatedUserActions,
  EDPARetargetingType,
  EOperationStatus,
  EOptimizationGoal,
  EPlacement,
  EPlacementType,
  EPromotedObjectType,
  EScheduledAdvertisingTime,
  ESpeedOfAdDelivery,
  EVideoDownloadPermissions,
  EVideoPlaybackDuration,
  EVideoRelatedUserActions,
} from '../../types/enums'

enum EAdGroupFields {
  Status = 'status',
  OptStatus = 'opt_status',
  ExternalAction = 'external_action',
  PixelId = 'pixel_id',
  OptimizeGoal = 'optimize_goal',
  AppId = 'app_id',
  CreateTime = 'create_time',
  ConversionBid = 'conversion_bid',
  CampaignName = 'campaign_name',
  Keywords = 'keywords',
  OperationSystem = 'operation_system',
  CreativeMaterialMode = 'creative_material_mode',
  Placement = 'placement',
  AdgroupId = 'adgroup_id',
  ConnectionType = 'connection_type',
  DeepCpaBid = 'deep_cpabid',
  ExternalType = 'external_type',
  AdgroupName = 'adgroup_name',
  Languages = 'languages',
  Location = 'location',
  AppDownloadUrl = 'app_download_url',
  BudgetMode = 'budget_mode',
  Category = 'category',
  ExcludedAudience = 'excluded_audience',
  AudienceRule = 'audience_rule',
  AudienceType = 'audience_type',
  EnableInventoryFilter = 'enable_inventory_filter',
  BillingEvent = 'billing_event',
  Bid = 'bid',
  CampaignId = 'campaign_id',
  AdvertiserId = 'advertiser_id',
  DeepBidType = 'deep_bid_type',
  ScheduleStartTime = 'schedule_start_time',
  ScheduleEndTime = 'schedule_end_time',
  DevicePrice = 'device_price',
  IsCommentDisable = 'is_comment_disable',
  BidType = 'bid_type',
  SkipLearningPhase = 'skip_learning_phase',
  Package = 'package',
  Gender = 'gender',
  Age = 'age',
  PlacementType = 'placement_type',
  Budget = 'budget',
  Pacing = 'pacing',
  ScheduleType = 'schedule_type',
  InterestCategory = 'interest_category',
  InterestCategoryV2 = 'interest_category_v2',
  Audience = 'audience',
  ModifyTime = 'modify_time',
  DeepExternalAction = 'deep_external_action',
  DayParting = 'dayparting',
  StatisticType = 'statistic_type',
  Carriers = 'carriers',
  VideoDownload = 'video_download',
  PangleBlockAppListId = 'pangle_block_app_list_id',
  ActionCategories = 'action_categories',
  ActionDays = 'action_days',
  VideoActions = 'video_actions',
  ActionV2 = 'action_v2',
  PangleAudiencePackageInclude = 'pangle_audience_package_include',
  PangleAudiencePackageExclude = 'pangle_audience_package_exclude',
  IsNewStructure = 'is_new_structure',
  CatalogId = 'catalog_id',
  ProductSetId = 'product_set_id',
  CncludeCustomActions = 'include_custom_actions',
  ExcludeCustomActions = 'exclude_custom_actions',
  DpaRetargetingType = 'dpa_retargeting_type',
  IsHfss = 'is_hfss',
  ConversionWindow = 'conversion_window',
}

type TAudienceRule = {
  inclusions: TAudienceRuleSet
  exclusions?: TAudienceRuleSet
}

type TAudienceRuleSet = {
  /**
   * Indicates the rule list relationship. AND indicates that both rules must be met, OR indicates that either one can
   * be met. Only OR is supported currently.
   */
  operator: 'OR' // 'AND' currently not supported.

  /**
   * TODO https://ads.tiktok.com/marketing_api/docs?id=100692
   */
  rules: object[]
}

export type TAdGroupListPayload = {
  advertiser_id: string

  /**
   * When not specified, all fields are returned by default.
   */
  fields?: EAdGroupFields[]
  page?: number
  page_size?: number
  filtering?: {
    /**
     * Filter by ad group name, supports fuzzy matching (name contains passed data).
     */
    adgroup_name?: string

    /**
     * Ad Groups IDs. Up to 100 items.
     */
    adgroup_ids?: string[]

    /**
     * Campaign IDs. Up to 100 items.
     */
    campaign_ids?: string[]

    /**
     * Bid method. Filter according to bid method.
     * TODO enum
     */
    billing_events?: string[]

    /**
     * Filter by Ad objectives.
     * TODO на уровне Ad Group вроде намного меньше целей, чем у кампании (APP_INSTALL CONVERSIONS TRAFFIC VIDEO_VIEWS
     *  CATALOG_SALES ENGAGEMENT).
     *
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    objective_type?: EAdvertisingObjective

    /**
     * Filter by Ad status.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    primary_status?: EAdvertisingStatus
  }
}

export type TAdGroupListResponse = {
  list: {
    advertiser_id: string
    campaign_id: string
    adgroup_id: string
    adgroup_name: string
    placement_type: string // TODO enum

    /**
     * Placement location. If placement type PLACEMENT_TYPE_AUTOMATIC (automatic), placement will be returned as "None".
     */
    placement: (EPlacement | 'None')[]
    /**
     * Inventory filtering (filtering security videos, hides unsafe videos), valid only for the PLACEMENT_TIKTOK placement.
     * Optional values are: true to filter, false not to filter.
     */
    enable_inventory_filter?: boolean

    /**
     * Ad category.
     * @deprecated
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100643}
     */
    category?: number

    /**
     * An array of keywords to describe the app/website.
     * @deprecated
     */
    keywords?: string[]

    /**
     * Whether to allow comments on your ads on TikTok, Vigo, Helo.
     * 0 - allow, 1 - restricted. Default allow.
     */
    is_comment_disable?: 0 | 1

    /**
     * The Application id of the promoted app.
     */
    app_id?: string

    /**
     * Type of promoted object.
     */
    external_type: EPromotedObjectType

    /**
     * App download link.
     */
    app_download_url?: string

    /**
     * Package name.
     */
    package?: string

    /**
     * Pixel ID. It is only applicable for landing pages (WEBSITE promoted object).
     */
    pixel_id?: string

    /**
     * Shallow events.
     */
    external_action?: EAppEvent

    /**
     * Deep conversion events.
     */
    deep_external_action?: EAppSecondaryGoalEvent

    /**
     * Creative delivery mode. Optional values include: CUSTOM(custom), DYNAMIC(automated). When you choose automated ad,
     * your creative materials will automatically be combined for delivery. Tiktok Ads' smart optimization algorithm is
     * applied and will be used to achieve the best ad performance during delivery.
     */
    creative_material_mode?: ECreativeDeliveryMode

    /**
     * A list of audience ID.
     */
    audience?: number[]

    /**
     * A list of Excluded audience ID.
     */
    excluded_audience?: number[]

    /**
     * Audience Rule.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100692}
     */
    audience_rule?: TAudienceRule

    /**
     * Audience Type (стратегия подбора аудитории).
     * @see EAudienceType
     */
    audience_type?: EAudienceType

    /**
     * Regional orientation.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100661}
     */
    location: number[]

    /**
     * Whether the promoted product is HFSS foods (foods that are high in fat, salt, or sugar).
     */
    is_hfss?: boolean

    /**
     * Interest classification. This field will be deprecated in v1.2. If the interest is specified, users that do not
     * meet interest target will be excluded during delivery. Do not specify if you wish to target everyone.
     *
     * @deprecated
     */
    interest_category?: number[]

    /**
     * Interest classification. If the interest is specified, users that do not meet interest target will be excluded
     * during delivery. Do not specify if you wish to target everyone.
     *
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100645}
     */
    interest_category_v2?: number[]

    /**
     * Audience age range.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    age?: EAudienceAgeRange[]

    /**
     * Audience gender.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    gender?: EAudienceGender

    /**
     * Audience language.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1688867109261313}
     */
    languages?: EAudienceLanguage[]

    /**
     *
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1688867136852994}
     */
    operation_system?: EAudienceOS[]

    /**
     * Network conditions. Wifi / 2G / 3G / 4G.
     */
    connection_type?: EAudienceNetworkType[]

    /**
     * Device price orientation (10000 represents 10000+).
     * For example: [0,300] represents price range is from $0 to $300.
     */
    device_price?: number[]

    /**
     * Audience minimum Android version.
     */
    android_osv?: EAudienceAndroidVersion

    /**
     * The iOS devices that you want to target.
     *
     * UNSET: This is the default value of the field. To mitigate revenue impact to users that are already on the iOS14
     * Dedicated Campaign allowlist, we have temporarily revised the definition of this value. The temporary definition
     * is valid until the official rollout of the ATT framework. When set to this value, your campaign will target all
     * iOS devices.
     *
     * IOS14_MINUS: Devices with iOS version earlier than 14 that are not affected by the iOS 14 privacy update. This is
     * the default value for ad groups that are created after the introduction of this field.
     *
     * IOS14_PLUS: Devices with iOS 14 and above. The iOS 14 privacy update has been enforced in this group of devices.
     *
     * TODO непонятно, почему тип number, а здесь идёт enum[string]
     */
    ios_target_device?: number

    /**
     * Audience minimum ios version.
     */
    ios_osv?: EAudienceIOSVersion

    /**
     * Ad budget type.
     * Return BUDGET_MODE_DAY when budget optimize switch is on.
     */
    budget_mode: EBudgetMode

    /**
     * Ad budget.
     * Return -1 when budget optimize switch is on.
     */
    budget: number

    /**
     * Ad schedule type.
     */
    schedule_type: EScheduledAdvertisingTime

    /**
     * Ad delivery start time (UTC+0).
     * Format should be "2017-01-01 00:00:00".
     */
    schedule_start_time: string

    /**
     * Ad delivery end time (UTC+0).
     * Format should be "2017-01-01 00:00:00".
     */
    schedule_end_time?: string

    /**
     * Ad delivery period, the default is always and the format is 48 * 7 character string, represented by 0 or 1.
     * That is, with half an hour as the minimum granularity, a day (24 hours) is divided by the minimum
     * granularity (30 mins) from Monday to Sunday. Resulting in a 48*7 format. 0 represents not to be delivered,
     * 1 represents delivery. no transmission, full transmission 0, full transmission 1 all represent full time delivery.
     *
     * Абракадабра какая-то в конце, но суть атрибута - сегментирование показов по дням и частям дня.
     */
    dayparting?: string

    /**
     * Optimization goal.
     * За что заливаем РК: за клики, за конверсии, за показы, и т.д.
     */
    optimize_goal: EOptimizationGoal

    /**
     * Optimized video playback duration.
     * Optional values include: SIX_SECONDS (video playback 6 seconds) and TWO_SECONDS (video playback 2 seconds)
     */
    cpv_video_duration?: EVideoPlaybackDuration

    /**
     * The time frame when you would like a conversion to happen after a user clicks on or views your ad.
     * Your ad delivery will be optimized using the conversion data during the time frame you select.
     * This setting will not impact your attribution data.
     */
    conversion_window?: EConversionWindow

    /**
     * Ad speed type.
     */
    pacing: ESpeedOfAdDelivery

    /**
     * Bid method.
     */
    billing_event: EBillingEvent

    /**
     * Bidding Strategy.
     */
    bid_type?: EBiddingStrategy

    /**
     * CPC, CPM bidding, oCPM learning bidding.
     */
    bid?: number

    /**
     * oCPM (learning bidding) conversion bid.
     */
    conversion_bid?: number

    /**
     * Deep bidding type.
     */
    deep_bid_type?: EBiddingDeepEvent[]

    /**
     * Deep bid.
     */
    deep_cpabid?: number

    /**
     * Ad Group status.
     */
    status?: EAdGroupStatus

    /**
     * Operation status.
     * Optional values include: DISABLE, ENABLE.
     */
    opt_status?: Exclude<EOperationStatus, EOperationStatus.Delete>

    /**
     * frequency, together with frequency_schedule, controls how often people see your ad (only available for REACH ads).
     * For example, frequency = 2 frequency_schedule = 3 means "show ads no more than twice every 3 day".
     */
    frequency?: number

    /**
     * frequency, together with frequency, controls how often people see your ad (only available for REACH ads).
     * @see frequency
     */
    frequency_schedule?: number

    /**
     * Conversion bid statistic type, bid for EVERYTIME (Each Purchase) / NONE (Unique Purchase).
     */
    statistic_type?: string

    /**
     * Carriers (я так понимаю это мобильные операторы, причём с разбивкой по странам).
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1675803798753286}
     */
    carriers?: string[]

    /**
     * Whether users can download your video ads on TikTok.
     * Default: ALLOW_DOWNLOAD.
     */
    video_download?: EVideoDownloadPermissions

    /**
     * Action Categories.
     * @deprecated
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1676632617091077}
     */
    action_categories?: number[]

    /**
     * The time period to include actions from. Allowed values: 7, 15.
     * @deprecated
     */
    action_days?: 7 | 15

    /**
     * Video-related Actions.
     * Optional values: WATCHED_TO_END, LIKED,COMMENTED,SHARED.
     * @deprecated
     */
    video_actions?: EVideoRelatedUserActions[]

    /**
     * A list of action category objects.
     */
    action_v2?: {
      /**
       * Action Categories.
       *
       * NOTE: It only takes effect when TikTok placement is the only placement selected.
       * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1676632617091077}
       */
      action_categories: string

      /**
       * The time period to include actions from.
       */
      action_period: 7 | 15

      /**
       * The action scene.
       */
      action_scene: EActionScene

      /**
       * Video-related Actions.
       * If action_scene is VIDEO_RELATED, the allowed values are: WATCHED_TO_END, LIKED, COMMENTED, SHARED.
       * If action_scene is CREATOR_RELATED, the allowed values are: FOLLOWING, VIEW_HOMEPAGE.
       */
      user_actions: (EVideoRelatedUserActions | ECreatorRelatedUserActions)[]
    }[]

    /**
     * Whether to skip the learning stage.
     * 0 - not skip, 1 - skip.
     */
    skip_learning_phase?: 0 | 1

    /**
     * Billing method of Reach & Frequency Ad groups.
     * Returned when objective_type of the related campaign is RF_REACH.
     */
    rf_buy_type?: string

    /**
     * Impressions to be purchased.
     * Returned when objective_type ot the related campaign is RF_REACH.
     */
    buy_impression?: number

    /**
     * Purchased user reach.
     * Returned when objective_type ot the related campaign is RF_REACH.
     */
    buy_reach?: number

    /**
     * The estimated cost per mile reach.
     * Returned when objective_type ot the related campaign is RF_REACH.
     */
    rf_predict_cpr?: number

    /**
     * The estimated show frequency.
     * Returned when objective_type ot the related campaign is RF_REACH.
     */
    rf_predict_frequency?: number

    /**
     * Pangle app block list ID.
     */
    pangle_block_app_list_id?: string[]

    /**
     * Pangle flow package include id list ID, which can be obtained through the package_id field returned by
     * [Advertiser-Pangle Audience Packages] whose bind_type is INCLUDE. It only takes effect when Pangle placement is
     * selected.
     *
     * NOTE: pangle_audience_package_include and pangle_audience_package_exclude cannot exist at the same time.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1682348130626562}
     */
    pangle_audience_package_include?: number[]

    /**
     * Same as pangle_audience_package_include, but EXCLUDED.
     *
     * NOTE: pangle_audience_package_include and pangle_audience_package_exclude cannot exist at the same time.
     * @see pangle_audience_package_include
     */
    pangle_audience_package_exclude?: number[]

    /**
     * Whether the campaign is a new structure.
     * For the same campaign, the structure of campaign, adgroups and ads are the same.
     */
    is_new_structure?: boolean

    /**
     * Catalog ID.
     * Return when the corresponding campaign objective_type is CATALOG_SALES.
     */
    catalog_id?: string

    /**
     * ProductSet ID of the catalog, pass 0 means select all.
     * Return when the corresponding campaign objective_type is CATALOG_SALES.
     */
    product_set_id?: string

    /**
     * Catalog ad redirection contains conditions.
     * Return when the corresponding campaign objective_type is CATALOG_SALES.
     */
    include_custom_actions?: object[]

    /**
     * Catalog ad redirection does not contain conditions.
     * Return when the corresponding campaign objective_type is CATALOG_SALES.
     */
    exclude_custom_actions: object[]

    /**
     * The types of ad redirection in the catalog.
     * Return when the corresponding campaign objective_type is CATALOG_SALES.
     * Redirect LAB1, LAB2, LAB3, non-redirect OFF.
     */
    dpa_retargeting_type?: EDPARetargetingType

    /**
     * Paired Split Test Ad Group ids.
     * Returned if the current Ad Group belongs to a Split Test
     */
    split_test_adgroup_ids?: string[]
  }[]
  page_info: TPageInfo
}

export type TAdGroupCreatePayload = {
  advertiser_id: string
  campaign_id: string
  adgroup_name: string // Character limit is 512 and cannot contain emoji.
  placement_type: EPlacementType // Default value is : PLACEMENT_TYPE_NORMAL

  /**
   * Advertisement positioning.
   * Required when placement_type = PLACEMENT_TYPE_NORMAL
   * Optional when placement_type = PLACEMENT_TYPE_AUTOMATIC
   *
   * NOTE: Vigo and Helo versions do not support ios app download.
   */
  placement?: EPlacement[]

  /**
   * Inventory filtering (Unsafe videos will not be displayed).
   * Only valid for "PLACEMENT_TIKTOK" version.
   * Default: False
   */
  enable_inventory_filter?: boolean

  /**
   * Ad category.
   * @deprecated
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100643}
   */
  category?: number

  /**
   * An array of keywords to describe the app/website.
   * @deprecated
   */
  keywords?: string[]

  /**
   * Whether to allow comments on your ads on TikTok, Vigo, Helo.
   * 0 - allow, 1 - restricted. Default allow.
   */
  is_comment_disable?: 0 | 1

  /**
   * The Application id of the promoted app.
   */
  app_id?: string

  /**
   * Type of promoted object.
   */
  external_type: EPromotedObjectType

  /**
   * Pixel ID. It is only applicable for landing pages (WEBSITE promoted object).
   */
  pixel_id?: string

  /**
   * Creative delivery mode. Optional values include: CUSTOM(custom), DYNAMIC(automated). When you choose automated ad,
   * your creative materials will automatically be combined for delivery. Tiktok Ads' smart optimization algorithm is
   * applied and will be used to achieve the best ad performance during delivery.
   */
  creative_material_mode?: ECreativeDeliveryMode

  /**
   * A list of audience ID.
   */
  audience?: number[]

  /**
   * A list of Excluded audience ID.
   */
  excluded_audience?: number[]

  /**
   * Audience Rule.
   * Valid if objective_type is TRAFFIC or CONVERSIONS
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100692}
   */
  audience_rule?: TAudienceRule

  /**
   * Audience Type (стратегия подбора аудитории).
   *
   * NOTE: CUSTOM_AUDIENCE is not supported if objective_type is TRAFFIC.
   * NOTE: EXCLUDE_INTERACT_USERS and EXCLUDE_SPECIFIC_EVENTS is not supported if objective_type is CONVERSIONS.
   * @see EAudienceType
   */
  audience_type?: EAudienceType

  /**
   * Geographic orientation.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100661}
   */
  location: number[]

  /**
   * Whether the promoted product is HFSS foods (foods that are high in fat, salt, or sugar).
   * NOTE: The European market prohibits the promotion of HFSS foods to underage users.
   */
  is_hfss?: boolean

  /**
   * Interest classification. This field will be deprecated in v1.2. If the interest is specified, users that do not
   * meet interest target will be excluded during delivery. Do not specify if you wish to target everyone.
   *
   * @deprecated
   */
  interest_category?: number[]

  /**
   * Interest classification. If the interest is specified, users that do not meet interest target will be excluded
   * during delivery. Do not specify if you wish to target everyone.
   *
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100645}
   */
  interest_category_v2?: number[]

  /**
   * Audience age range.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
   */
  age?: EAudienceAgeRange[]

  /**
   * Audience gender.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
   */
  gender?: EAudienceGender

  /**
   * Audience language.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1688867109261313}
   */
  languages?: EAudienceLanguage[]

  /**
   * Operation system.
   *
   * NOTE: this field is required when the ad objective is APP_INSTALL and TRAFFIC.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1688867136852994}
   */
  operation_system?: EAudienceOS[]

  /**
   * Network conditions. Wifi / 2G / 3G / 4G.
   * Default is "unlimited".
   */
  connection_type?: EAudienceNetworkType[]

  /**
   * Device price orientation (10000 represents 1000+).
   * For example: [0,300] represents price range is from $0 to $300.
   * Prices need to be continuous, such as [50,250] will be converted into [50,100,200,250].
   */
  device_price?: number[]

  /**
   * Audience minimum Android version (Specify for Android apps).
   */
  android_osv?: EAudienceAndroidVersion

  /**
   * Audience minimum ios version (Specify for IOS apps).
   */
  ios_osv?: EAudienceIOSVersion

  /**
   * The iOS devices that you want to target.
   *
   * UNSET: This is the default value of the field. To mitigate revenue impact to users that are already on the iOS14
   * Dedicated Campaign allowlist, we have temporarily revised the definition of this value. The temporary definition
   * is valid until the official rollout of the ATT framework. When set to this value, your campaign will target all
   * iOS devices.
   *
   * IOS14_MINUS: Devices with iOS version earlier than 14 that are not affected by the iOS 14 privacy update. This is
   * the default value for ad groups that are created after the introduction of this field.
   *
   * IOS14_PLUS: Devices with iOS 14 and above. The iOS 14 privacy update has been enforced in this group of devices.
   *
   * NOTE: If IOS14_PLUS is specified for this field, the system will verify if related fields meet the requirements
   * for an iOS 14 campaign. The following fields will be checked:
   *  app_id: It must not be an ID of an Android app.
   *  operation_system: It must not be ANDROID or PC.
   *  ios_osv: The value must not contradict with the selection for ios_target_device.
   *  android_osv: Must not be specified.
   *  optimize_goal: Can only be set to IN_APP_EVENT, INSTALL, or CLICK.
   *  dpa_retargeting_type: Must not be specified.
   *  dpa_retargeting_actions_days: Must not be specified.
   *  conversion_window: Must not be specified.
   *
   * On the Ad level, open_url_type must not be set to DEFERRED_DEEPLINK.
   *
   * TODO непонятно, почему тип number, а здесь идёт enum[string]
   */
  ios_target_device?: number

  /**
   * Ad budget type.
   * Ignored when budget optimize switch is on.
   */
  budget_mode: EBudgetMode

  /**
   * Ad budget.
   */
  budget: number

  /**
   * Ad schedule type.
   */
  schedule_type: EScheduledAdvertisingTime

  /**
   * Ad delivery start time (UTC+0).
   * Format should be "2017-01-01 00:00:00".
   */
  schedule_start_time: string

  /**
   * Ad delivery end time (UTC+0).
   * Format should be "2017-01-01 00:00:00".
   * Required if schedule_type is SCHEDULE_START_END.
   */
  schedule_end_time?: string

  /**
   * Ad delivery period, the default is always full-time delivery and the format is 48 * 7 character string,
   * represented by 0 or 1. That is, with half an hour as the minimum granularity, a day (24 hours) is divided by the
   * minimum granularity(30 mins) from Monday to Sunday. Resulting in a 48*7 format. 0 represents not to be delivered,
   * 1 represents delivery. No transmission, full transmission 0 and full transmission 1 all represent the full time
   * delivery, for example, “000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
   * 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
   * 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
   * 000000000000000000” represents full-time delivery
   *
   * Ну херня, что-то про деление дня на N количество равных частей, и выставление битовой маски на показ или не показ.
   */
  dayparting?: string

  /**
   * Optimization goal.
   * За что заливаем РК: за клики, за конверсии, за показы, и т.д.
   * Ignored when budget optimize switch is on.
   */
  optimize_goal: EOptimizationGoal

  /**
   * Shallow event.
   * Required when the promoted object is an App with tracking urls, required when pixel_id is specified.
   *
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100659}
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100576}
   */
  external_action?: EAppEvent

  /**
   * Deep conversion event, when optimize_goal = INSTALL.
   */
  deep_external_action?: EAppSecondaryGoalEvent

  /**
   * Optimized video playback duration.
   * Required if optimize_goal is VIDEO_VIEW.
   * Optional values include: SIX_SECONDS (video playback 6 seconds) and TWO_SECONDS (video playback 2 seconds)
   */
  cpv_video_duration?: EVideoPlaybackDuration

  /**
   * The time frame when you would like a conversion to happen after a user clicks on or views your ad.
   * Your ad delivery will be optimized using the conversion data during the time frame you select.
   * This setting will not impact your attribution data.
   *
   * Currently, this field is available only when your promotion product is an App. If no value is specified for this
   * field, the default values will be used. For different "optimize_goal", the default values are different:
   *  INSTALL : ONE_DAY_CLICK_OR_ONE_DAY_VIEW
   *  IN_APP_EVENT : SEVEN_DAY_CLICK_OR_ONE_DAY_VIEW
   */
  conversion_window?: EConversionWindow

  /**
   * Ad delivery speed type.
   * When budget optimize switch is on, your setting will be ignored and it will be set as PACING_MODE_SMOOTH by system.
   */
  pacing: ESpeedOfAdDelivery

  /**
   * Bid method.
   */
  billing_event: EBillingEvent

  /**
   * Bidding Strategy.
   * Ignored when budget optimize switch is on.
   */
  bid_type?: EBiddingStrategy

  /**
   * CPC, CPM bidding, oCPM learning bidding.
   * When budget optimize switch is on, we advise you to set the same value for all the adgroups in one campaign.
   */
  bid?: number

  /**
   * oCPM (learning bidding) conversion bid.
   * Required when billing_event = OCPM and bid_type = BID_TYPE_CUSTOM.
   */
  conversion_bid?: number

  /**
   * Deep bidding type.
   */
  deep_bid_type?: EBiddingDeepEvent[]

  /**
   * Deep bid.
   */
  deep_cpabid?: number

  /**
   * frequency, together with frequency_schedule, controls how often people see your ad (only available for REACH ads).
   * For example, frequency = 2 frequency_schedule = 3 means "show ads no more than twice every 3 day".
   */
  frequency?: number

  /**
   * frequency, together with frequency, controls how often people see your ad (only available for REACH ads).
   * @see frequency
   */
  frequency_schedule?: number

  /**
   * Conversion bid statistic type, bid for EVERYTIME (Each Purchase) / NONE (Unique Purchase).
   * statistic_type suitable for your app event can be retrieved by App Event.
   */
  statistic_type?: string

  /**
   * Carriers (я так понимаю это мобильные операторы, причём с разбивкой по странам).
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1675803798753286}
   */
  carriers?: string[]

  /**
   * Whether users can download your video ads on TikTok.
   * Default: ALLOW_DOWNLOAD.
   */
  video_download?: EVideoDownloadPermissions

  /**
   * Action Categories.
   *
   * NOTE: It only takes effect when TikTok placement is the only placement selected.
   * @deprecated
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1676632617091077}
   */
  action_categories?: number[]

  /**
   * The time period to include actions from. Allowed values: 7, 15.
   * @deprecated
   */
  action_days?: 7 | 15

  /**
   * Video-related Actions.
   * Optional values: WATCHED_TO_END, LIKED,COMMENTED,SHARED.
   * @deprecated
   */
  video_actions?: EVideoRelatedUserActions[]

  /**
   * A list of action category objects.
   */
  action_v2?: {
    /**
     * Action Categories.
     *
     * NOTE: It only takes effect when TikTok placement is the only placement selected.
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1676632617091077}
     */
    action_categories: string

    /**
     * The time period to include actions from.
     */
    action_period: 7 | 15

    /**
     * The action scene.
     */
    action_scene: EActionScene

    /**
     * Video-related Actions.
     * If action_scene is VIDEO_RELATED, the allowed values are: WATCHED_TO_END, LIKED, COMMENTED, SHARED.
     * If action_scene is CREATOR_RELATED, the allowed values are: FOLLOWING, VIEW_HOMEPAGE.
     */
    user_actions: (EVideoRelatedUserActions | ECreatorRelatedUserActions)[]
  }[]

  /**
   * Pangle app block list ID.
   */
  pangle_block_app_list_id?: string[]

  /**
   * Pangle flow package include id list ID, which can be obtained through the package_id field returned by
   * [Advertiser-Pangle Audience Packages] whose bind_type is INCLUDE. It only takes effect when Pangle placement is
   * selected.
   *
   * NOTE: pangle_audience_package_include and pangle_audience_package_exclude cannot exist at the same time.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1682348130626562}
   */
  pangle_audience_package_include?: number[]

  /**
   * Same as pangle_audience_package_include, but EXCLUDED.
   *
   * NOTE: pangle_audience_package_include and pangle_audience_package_exclude cannot exist at the same time.
   * @see pangle_audience_package_include
   */
  pangle_audience_package_exclude?: number[]

  /**
   * Catalog ID.
   * Return when the corresponding campaign objective_type is CATALOG_SALES.
   */
  catalog_id?: number

  /**
   * ProductSet ID of the catalog, pass 0 means select all.
   * Default value is 0.
   */
  product_set_id?: number

  /**
   * Catalog ad redirection contains conditions.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1688302449093634}
   */
  include_custom_actions?: object[]

  /**
   * Catalog ad redirection does not contain conditions.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1688302449093634}
   */
  exclude_custom_actions?: object[]

  /**
   * The types of ad redirection in the catalog.
   * Redirect LAB1, LAB2, LAB3, non-redirect OFF.
   */
  dpa_retargeting_type?: EDPARetargetingType

  /**
   * The effective number of days for the ad redirection condition of the catalog.
   * Required when dpa_retargeting_type pass LAB1 and LAB2.
   */
  dpa_retargeting_actions_days?: 1 | 2 | 3 | 7 | 14 | 30 | 60 | 90 | 180

  /**
   * Whether to skip the learning phase.
   * 0 - not skip, 1 - skip.
   * Default value is 1.
   *
   * NOTE: It only takes effect when the corresponding campaign objective_type is CATALOG_SALES and bid_type is OCPM.
   */
  skip_learning_phase?: 0 | 1

  /**
   * Whether to create Ad Groups for Split Test.
   * Default: False.
   */
  is_split_test?: boolean

  /**
   * The estimated_id from Ads-Split Test-Budget, Power Value and Audience Estimates.
   * Required when is_split_test = True.
   * The parameters used to create Ad Groups must be the same as those used when calling the estimates endpoint.
   */
  split_test_estimate_id?: number

  /**
   * Required when is_split_test = True and split_test_variable = TARGETING.
   * The length of targeting_variable must be 2, and the two objects must be different.
   *
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1692746716091393}
   */
  targeting_variable?: {
    /**
     * A list of audience ID.
     */
    audience: number[]

    /**
     * A list of Excluded audience ID.
     */
    excluded_audience: number[]
  }[]

  /**
   * Required when is_split_test = True and split_test_variable = BIDDING_OPTIMIZATION.
   * The length of bidding_variable must be 2, and the two objects must be different.
   * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=1692746716091393}
   */
  bidding_variable?: {
    /**
     * Optimization goal.
     * Ignored when budget optimize switch is on.
     */
    optimize_goal: string

    /**
     * Shallow event.
     * Required when the promoted object is an App with tracking urls, required when pixel_id is specified.
     *
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100659}
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100576}
     */
    external_action: string
  }[]
}

export type TAdGroupCreateResponse = {
  adgroup_id: number
  split_test_adgroup_ids?: number[]
}
