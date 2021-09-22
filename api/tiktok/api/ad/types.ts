import { TPageInfo } from '~/api/tiktok/types'
import {
  EAdContentType,
  EAdReviewStatus,
  EAdvertisingObjective,
  EAdvertisingStatus,
  EAudienceAgeRange,
  EAudienceOS,
  EBillingEvent,
  ECallToAction,
  ECreativeMaterialTag,
  EOperationStatus,
  EPlacement,
} from '../../types/enums'

enum EAdFields {
  AdGroupId = 'adgroup_id',
  AdGroupName = 'adgroup_name',
  AdvertiserId = 'advertiser_id',
  CallToAction = 'call_to_action',
  CampaignId = 'campaign_id',
  CampaignName = 'campaign_name',
  CreateTime = 'create_time',
  AdName = 'ad_name',
  Status = 'status',
  OptStatus = 'opt_status',
  AdId = 'ad_id',
  ImageIds = 'image_ids',
  ImageMode = 'image_mode',
  ModifyTime = 'modify_time',
  AdText = 'ad_text',
  VideoId = 'video_id',
  AppName = 'app_name',
  OpenUrl = 'open_url',
  LandingPageUrl = 'landing_page_url',
  DisplayName = 'display_name',
  ProfileName = 'profile_image',
  ImpressionTrackingUrl = 'impression_tracking_url',
  ClickTrackingUrl = 'click_tracking_url',
  PlayableUrl = 'playable_url',
  IsCreativeAuthorized = 'is_creative_authorized',
  IsNewStructure = 'is_new_structure',
}

export type TAdListPayload = {
  advertiser_id: string
  fields?: EAdFields[]
  page?: number
  page_size?: number
  filtering?: {
    /**
     * A list of Campaign IDs, quantity: 1-100.
     */
    campaign_ids?: string[]

    /**
     * A list of Ad group ID, quantity: 1-100.
     */
    adgroup_ids?: string[]

    /**
     * A list of Ad ID，quantity: 1-100.
     */
    ad_ids?: string[]

    /**
     * Ad text, searches for exact match.
     */
    ad_text?: string

    image_mode?: ECreativeMaterialTag
    objective_type?: EAdvertisingObjective
    billing_events?: EBillingEvent[]

    /**
     * Default: STATUS_NOT_DELETE.
     */
    primary_status?: EAdvertisingStatus

    /**
     * Filter by create time.
     * Use this field to specify the earliest create time of ad.
     * Format: "2020-10-12 00:00:00"
     */
    create_start_time?: string

    /**
     * Filter by create time.
     * Use this field to specify the earliest create time of ad.
     * Format: "2020-10-12 00:00:00"
     */
    create_end_time?: string

    /**
     * Secondary status.
     * @deprecated
     */
    status?: string
  }
}

export type TAdListResponse = {
  /**
   * A List of Ads. The returned fields are generated based on the fields specified in the request parameters.
   * If not specified, all fields are returned by default.
   */
  list: {
    advertiser_id?: string
    campaign_id?: string
    campaign_name?: string
    adgroup_id?: string
    adgroup_name?: string
    ad_id?: string
    ad_name?: string
    call_to_action?: ECallToAction
    status?: string
    opt_status?: EOperationStatus

    /**
     * Whether the ad is an automated ad. Set to true for automated ad and false for non-automated ad.
     */
    is_aco?: boolean

    image_ids?: string[]

    /**
     * Material type.
     * @deprecated
     */
    image_mode?: ECreativeMaterialTag

    ad_text?: string
    video_id?: string
    app_name?: string

    /**
     * Application direct link.
     */
    open_url?: string

    /**
     * Landing page URL.
     */
    landing_page_url?: string

    /**
     * Landing page display name.
     */
    display_name?: string

    /**
     * Avatar URL.
     */
    profile_image?: string

    /**
     * Display monitoring URL.
     */
    impression_tracking_url?: string

    /**
     * Click monitoring URL. Currently Pangle does not support DCM, Sizmek or Flashtalking.
     */
    click_tracking_url?: string

    /**
     * Playable material url.
     */
    playable_url?: string

    /**
     * Whether you grant displaying some of your ads in our TikTok For Business Creative Center.
     * Only valid for non-US advertisers, the default value is false.
     */
    is_creative_authorized?: boolean

    /**
     * Whether the campaign is a new structure.
     * For the same campaign, the structure of campaign, adgroups and ads are the same.
     */
    is_new_structure?: boolean

    /**
     * Time at which the ad was created.
     */
    create_time?: string

    /**
     * Time at which the ad was Modified.
     */
    modify_time?: string
  }[]
  page_info: TPageInfo
}

export type TAdCreatePayload = {
  advertiser_id: string
  adgroup_id: string
  creatives: {
    call_to_action?: ECallToAction

    /**
     * Ad Name.
     * Character limit is 512 and cannot contain emoji.
     * NOTE: Each word in Chinese or Japanese counts as two characters, while each letter in English counts as one character.
     */
    ad_name: string

    /**
     * A list of image ID (Image material or video cover), can be obtained from [see{1}].
     * Video cover is required for certain types of video materials.
     *
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100560}
     * @see [Documentation]{@link https://ads.tiktok.com/marketing_api/docs?id=100641}
     */
    image_ids: string[]

    /**
     * Material type.
     * @deprecated
     */
    image_mode?: string

    /**
     * Ad text. It is included and shown to your audience as part of your ad creative, delivering the message
     * you wish to advertise to them.
     *
     * Замечания и требования к тексту объявления:
     *  1. Может содержать 12-100 символов (азиатские символы считаются за 2).
     *  2. Недопустимы символы { }, #, и эмодзи. Знаки пунктуации и пробелы считаются символами.
     *  3. Текст, отображаемый пользователю, может варьироваться в зависимости от модели устройства и ОС, длинный текст
     *  может быть обрезан.
     *
     * NOTE: Avoid using extremely descriptive words like "best", "most", "first", and others.
     */
    ad_text: string

    /**
     * Video ID.
     * Required when the material type is video.
     */
    video_id?: string

    /**
     * Playable material url, only valid if pangle is the only placement.
     * NOTE: All ads in the same adgroup share the same playble material.
     */
    playable_url?: string

    /**
     * Whether you grant displaying some of your ads in our TikTok For Business Creative Center.
     * Only valid for non-US advertisers.
     * Default value is False.
     */
    is_creative_authorized?: boolean
  }[]
}

export type TAdCreateResponse = {
  /**
   * A list of Ad ID.
   */
  ad_ids: string[]

  /**
   * Whether to set status to pending.
   */
  need_audit: boolean
}

export type TAdReviewInfoPayload = {
  advertiser_id: string

  /**
   * The list of ad IDs.
   * Quantity: 1-100.
   */
  ad_ids: string[]
}

export type TAdReviewInfoResponse = {
  /**
   * The bi-dimensional structure for the review data on the ad level.
   * The key for the first dimension is adgroup_id.
   * The key for the second dimension is ad_id.
   * ??? в примере по-другому структура описана, adgroup_id там вообще не фигурирует.
   *
   * @see [API Doc]{@link https://ads.tiktok.com/marketing_api/docs?rid=q8om9ypqcu9&id=1693202518080514}
   */
  ad_review_map: {
    [ad_id: string]: {
      /**
       * The ad ID.
       */
      id: number

      /**
       * Whether the ad has been approved or not.
       */
      is_pass: boolean

      /**
       * The ad review status.
       */
      review_status: EAdReviewStatus

      /**
       * The placements that failed the review.
       */
      forbidden_placements?: EPlacement[]

      /**
       * The audience age ranges that failed the review.
       */
      forbidden_ages?: EAudienceAgeRange[]

      /**
       * The targeted regions that failed the review.
       * @see [Enum]{@link https://ads.tiktok.com/marketing_api/docs?id=100661}
       */
      forbidden_locations?: string[]

      /**
       * The audience operating systems that failed the review.
       */
      forbidden_operation_systems?: EAudienceOS[]

      /**
       * The last time when the ad group was reviewed (UTC+0), in the format of YYYY-MM-DD HH:MM:SS.
       * An example: "2017-01-01 00:00:00".
       */
      last_audit_time?: string

      /**
       * Details about the rejection.
       */
      reject_info?: {
        /**
         * The review suggestion.
         */
        suggestion: string

        /**
         * The list of rejection reasons.
         */
        reasons: string[]

        /**
         * The targeted regions of current reject reason.
         */
        forbidden_locations?: string[]

        /**
         * The content of the ad that has been reviewed.
         */
        content_info: {
          image_content?: {
            image_id: string
          }
          video_content?: {
            video_id: string
          }
          text_content?: string
          content_type: EAdContentType
        }
      }
    }
  }
}
