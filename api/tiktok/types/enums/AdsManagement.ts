export enum EBudgetMode {
  Day = 'BUDGET_MODE_DAY',
  Total = 'BUDGET_MODE_TOTAL',
  Infinite = 'BUDGET_MODE_INFINITE',
}

export enum EAdvertisingObjective {
  AppInstall = 'APP_INSTALL', // Get more people to install your app.
  Conversions = 'CONVERSIONS', // Drive valuable actions on your website or app.
  Traffic = 'TRAFFIC', // Send more people to a destination on your website or app.
  VideoViews = 'VIDEO_VIEWS', // Get more people to view your video content.
  Reach = 'REACH', // Show your ad to the maximum number of people.
  LeadGeneration = 'LEAD_GENERATION', // ALLOW-LISTED. Collect leads for your business or brand.
  RfReach = 'RF_REACH', // ALLOW-LISTED. Reach and frequency buying.
  Engagement = 'ENGAGEMENT', // ALLOW-LISTED. Get more follows or profile visits.
  CatalogSales = 'CATALOG_SALES', // ALLOW-LISTED. DPA Ad, attract users to buy your products.
  RfVideoViews = 'RF_VIDEO_VIEWS', // ALLOW-LISTED. Get more people to view your video content in R&F ads.
}

export enum EAdvertisingStatus {
  Delete = 'STATUS_DELETE',
  InProgress = 'STATUS_DELIVERY_OK',
  Suspended = 'STATUS_DISABLE',
  NotDelivery = 'STATUS_NOT_DELIVERY', // Advertising not in delivery
  Completed = 'STATUS_TIME_DONE', // Completed (this status does not exist for campaigns)
  All = 'STATUS_ALL', // All statuses (including "Deleted")
  NotDeleted = 'STATUS_NOT_DELETE', // All statuses (excluding "Deleted")
}

export enum EOperationStatus {
  Delete = 'DELETE',
  Enable = 'ENABLE',
  Disable = 'DISABLE',
}

export enum ECampaignType {
  Regular = 'REGULAR_CAMPAIGN',
  iOS14 = 'IOS14_CAMPAIGN',
}

export enum EAdGroupStatus {
  // TODO
}

export enum EAdStatus {
  // TODO
}

export enum EBillingEvent {
  CPC = 'CPC',
  CPM = 'CPM',
  CPV = 'CPV',
  oCPM = 'OCPM', // oCPM learning bidding.
  // oCPC = 'OCPC', // Deprecated. oCPC (CPA is equal to oCPC)
}

export enum EBiddingStrategy {
  /**
   * Manual bidding.
   * This bidding strategy is called "Cost Cap" in TikTok Ads Manager.
   */
  Manual = 'BID_TYPE_CUSTOM',

  /**
   * Maximum conversion bidding.
   * This bidding strategy is called "Max Conversion" in TikTok Ads Manager.
   */
  MaxConversion = 'BID_TYPE_MAX_CONVERSION',

  /**
   * Disable bid control, spending your budget fully and getting the maximum possible results.
   * This bidding strategy is called "Lowest Cost" in TikTok Ads Manager. This option is an allowlist-only feature.
   * It is only supported for App Installs, Conversion and DPA objectives and also dependent on whether the app event supports it.
   *
   * NOTE: allowlist-only feature.
   */
  DisableBidControl = 'BID_TYPE_NO_BID',
}

export enum EBiddingDeepEvent {
  /**
   * No deep event bid.
   */
  Default = 'DEFAULT',

  /**
   * Double bid.
   * Operation Method: Tiktok Ads platform will bid to keep your average cost around your target, including
   * installation and target costs. Recommended for: Maintaining a stable cost on your bid for both installation costs
   * and your target costs.
   *
   * NOTE: This might cause a lower install volume.
   */
  Double = 'MIN',

  /**
   * Automatic optimization.
   * Operation method: Tiktok Ads platform will bid to keep your average installation cost around your target goal,
   * while aiming to get you the maximum number of target events. Recommended for: Maintaining a stable cost around
   * your installation bid and getting an optimized cost for your target goal.
   *
   * NOTE: The cost for your target goal might be higher than that from Multi Bid mode.
   */
  Automatic = 'PACING',
}

// Информация https://ads.tiktok.com/help/article?aid=9579
export enum EPlacement {
  TopBuzz = 'PLACEMENT_TOPBUZZ',
  TikTok = 'PLACEMENT_TIKTOK',
  Helo = 'PLACEMENT_HELO',
  Pangle = 'PLACEMENT_PANGLE', // Used to be TikTok_Audience_Network
}

export enum EPlacementType {
  Custom = 'PLACEMENT_TYPE_NORMAL',
  Automatic = 'PLACEMENT_TYPE_AUTOMATIC',
}

export enum EScheduledAdvertisingTime {
  FromNow = 'SCHEDULE_FROM_NOW', // From now on (continuous deliver).
  SetStartEnd = 'SCHEDULE_START_END', // Set Start and End time.
}

export enum ESpeedOfAdDelivery {
  Smooth = 'PACING_MODE_SMOOTH', // Standard pace, budgets are allocated within the scheduled ad time.
  Fast = 'PACING_MODE_FAST', // Fast paced, consumes budget and produces results as fast as possible.
}

export enum EOptimizationGoal {
  Click = 'CLICK',
  Conversion = 'CONVERT',
  Install = 'INSTALL',
  InAppEvent = 'IN_APP_EVENT',
  Impression = 'SHOW',
  VideoView = 'VIDEO_VIEW',
  Reach = 'REACH',
  Leads = 'LEAD_GENERATION',
  Follows = 'FOLLOWERS',
  ProfileViews = 'PROFILE_VIEWS',
}

// TODO TIKTOK_SHOP???
export enum EPromotedObjectType {
  AndroidApp = 'APP_ANDROID',
  iOSApp = 'APP_IOS',
  TikTokShop = 'TIKTOK_SHOP',
  Website = 'WEBSITE',
  LeadForm = 'LEAD_GENERATION',
  WebsiteOrPureDisplay = 'WEBSITE_OR_DISPLAY',
}

export enum ECallToAction {
  ApplyNow = 'APPLY_NOW',
  BookNow = 'BOOK_NOW',
  ContactUs = 'CONTACT_US',
  DownloadNow = 'DOWNLOAD_NOW',
  LearnMore = 'LEARN_MORE',
  ShopNow = 'SHOP_NOW',
  SignUp = 'SIGN_UP',
  PlayGame = 'PLAY_GAME',
  WatchNow = 'WATCH_NOW',
  ReadMore = 'READ_MORE',
  ViewNow = 'VIEW_NOW',
  GetQuote = 'GET_QUOTE',
  OrderNow = 'ORDER_NOW',
  InstallNow = 'INSTALL_NOW',
  GetShowtimes = 'GET_SHOWTIMES',
  ListenNow = 'LISTEN_NOW',
  Interested = 'INTERESTED',
  Subscribe = 'SUBSCRIBE',
  GetTicketsNow = 'GET_TICKETS_NOW',
  ExperienceNow = 'EXPERIENCE_NOW',
  PreorderNow = 'PREORDER_NOW',
  VisitStore = 'VISIT_STORE',
}

export enum ECreativeType {
  Image = 'SINGLE_IMAGE',
  Video = 'SINGLE_VIDEO',
  Carousel = 'CAROUSEL', // Image and video.
}

export enum EConversionWindow {
  OneDayClick = 'ONE_DAY_CLICK',
  SevenDayClick = 'SEVEN_DAY_CLICK',
  OneDayClickOrView = 'ONE_DAY_CLICK_OR_ONE_DAY_VIEW',
  SevenDayClickOrView = 'SEVEN_DAY_CLICK_OR_ONE_DAY_VIEW',
}

export enum EVideoDownloadPermissions {
  Allow = 'ALLOW_DOWNLOAD',
  Prevent = 'PREVENT_DOWNLOAD',
}

export enum EActionScene {
  VideoRelated = 'VIDEO_RELATED',
  CreatorRelated = 'CREATOR_RELATED',
}

export enum EVideoRelatedUserActions {
  WatchedToEnd = 'WATCHED_TO_END',
  Liked = 'LIKED',
  Commented = 'COMMENTED',
  Shared = 'SHARED',
}

export enum ECreatorRelatedUserActions {
  Following = 'FOLLOWING',
  ViewHomepage = 'VIEW_HOMEPAGE',
}

// The types of ad redirection in the catalog
export enum EDPARetargetingType {
  Lab1 = 'LAB1',
  Lab2 = 'LAB2',
  Lab3 = 'LAB3',
  Off = 'OFF', // Non-redirect
}

export enum EAdReviewStatus {
  Available = 'ALL_AVAILABLE',
  PartAvailable = 'PART_AVAILABLE',
  Unavailable = 'UNAVAILABLE',
}

export enum EAdContentType {
  String = 'MODE_STRING',
  Image = 'MODE_IMAGE',
  Video = 'MODE_VIDEO',
}
