export enum EAppEvent {
  Active = 'ACTIVE',
  ActiveRegister = 'ACTIVE_REGISTER',
  CreateRole = 'CREATE_GAMEROLE',
  Login = 'LOGIN',
  CompleteTutorial = 'COMPLETE_TUTORIAL',
  NextDayOpen = 'NEXT_DAY_OPEN', // Day 1 retention.
  InAppCart = 'IN_APP_CART',
  AddToWishlist = 'ADD_TO_WISHLIST',
  LaunchApp = 'LAUNCH_APP',
  ViewDetails = 'IN_APP_DETAIL_UV',
  CreateGroup = 'CREATE_GROUP',
  SalesLead = 'SALES_LEAD',
  InAppAdClick = 'IN_APP_AD_CLICK',
  InAppAdImpression = 'IN_APP_AD_IMPR',
  JoinGroup = 'JOIN_GROUP',
  AchieveLevel = 'UPDATE_LEVEL', // Achieve a level. This event is named achieve_level in TikTok Ads Manager.
  IssueLoan = 'LOAN_COMPLETION', // Какой-то заём или ссуда
  Rate = 'RATE', // Оценил что-то
  Search = 'SEARCH',
  SpendCredits = 'SPEND_CREDITS',
  UnlockAchievement = 'UNLOCK_ACHIEVEMENT',
}

export enum EAppSecondaryGoalEvent {
  Payment = 'ACTIVE_PAY',
  PaymentInfo = 'ADD_PAYMENT_INFO',
  InAppPurchase = 'IN_APP_ORDER',
  LoanApply = 'LOAN_APPLY', // Apply for a loan (заём, ссуда).
  StartTrial = 'START_TRIAL',
  Subscribe = 'SUBSCRIBE',
}
