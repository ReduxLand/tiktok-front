export enum EAdvertiserRoles {
  Advertiser = 'ROLE_ADVERTISER', // Standard advertiser (direct customer)
  SubAdvertiser = 'ROLE_CHILD_ADVERTISER', // Standard advertiser (agency sub-account)
  Agency = 'ROLE_AGENT', // Primary agency
  SubAgency = 'ROLE_CHILD_AGENT', // Secondary agency
}

export enum EAdvertiserStatus {
  Active = 'STATUS_ENABLE',
  Disabled = 'STATUS_DISABLE',
  PendingReview = 'STATUS_PENDING_CONFIRM', // Application pending review
  PendingVerification = 'STATUS_PENDING_VERIFIED',
  ReviewFailed = 'STATUS_CONFIRM_FAIL',
  CRMSystemReviewFailed = 'STATUS_CONFIRM_FAIL_END', // CRM system review failed
  ModificationsPendingReview = 'STATUS_PENDING_CONFIRM_MODIFY',
  ModificationsReviewFailed = 'STATUS_CONFIRM_MODIFY_FAIL',
  Restricted = 'STATUS_LIMIT',
  CRMSystemPendingReview = 'STATUS_WAIT_FOR_BPM_AUDIT',
  PendingCorporateBankAccountAuth = 'STATUS_WAIT_FOR_PUBLIC_AUTH',
  PendingVerificationSelfService = 'STATUS_SELF_SERVICE_UNAUDITED',
  ContractNotTakenEffect = 'STATUS_CONTRACT_PENDING',
}

export enum EAdvertiserDisplayStatus {
  Failed = 'SHOW_ACCOUNT_STATUS_NOT_APPROVED',
  Passed = 'SHOW_ACCOUNT_STATUS_APPROVED',
  UnderReview = 'SHOW_ACCOUNT_STATUS_IN_REVIEW',
  Punishment = 'SHOW_ACCOUNT_STATUS_PUNISHED',
}

export enum EAdvertiserBillingStatus {
  Transfer = 'TRANS_TYPE_TRANSFER',
  Consumption = 'TRANS_TYPE_TAX',
  Tax = 'TRANS_TYPE_COST', // Вроде не перепутал, хотя и кажется, что должно быть наоборот
}
