export enum ECreativeUploadType {
  /**
   * Загрузка из URL-источника.
   */
  Url = 'UPLOAD_BY_URL',

  /**
   * Загрузка файла напрямую в Creative Media Library.
   */
  File = 'UPLOAD_BY_FILE',

  /**
   * Загрузка файла по его File ID в Temporary File Repository.
   */
  FileId = 'UPLOAD_BY_FILE_ID',
}

export enum ECreativeMaterialType {
  Ad = 'AD',
  Video = 'SINGLE_VIDEO',
  Image = 'SINGLE_IMAGE',
}

export enum ECreativeFormat {
  ImageLandscape = 'IMAGE_MODE_LARGE',
  ImagePortrait = 'IMAGE_MODE_LARGE_VERTICAL',
  VideoLandscape = 'IMAGE_MODE_VIDEO',
  VideoPortrait = 'IMAGE_MODE_VIDEO_VERTICAL',
  VideoSquare = 'IMAGE_MODE_VIDEO_SQUARE',
}

export enum ECreativeTaskStatus {
  Created = 'CREATED',
  Processing = 'PROCESSING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export enum ECreativeDeliveryMode {
  Custom = 'CUSTOM',

  /**
   * Tiktok Ads' smart optimization algorithm used to achieve the best ad performance during delivery.
   * @see [Info & API Doc] {@link https://ads.tiktok.com/marketing_api/docs?rid=q8om9ypqcu9&id=1675425559596037}
   */
  Automated = 'DYNAMIC',
}

export enum ECreativeMaterialTag {
  Title = 'title', // Product name. Text.
  Price = 'price', // Price. Text.
  Description = 'description', // Description (default for text). Text.
  Logo = 'logo', // Image.
  Image = 'image', // Image.
  Video = 'video', // Video.
}

export enum ECreativeFrameTemplateType {
  Horizontal1 = 'END_FRAME_HORIZONTAL_1',
  Vertical1 = 'END_FRAME_VERTICAL_1',
  Horizontal2 = 'END_FRAME_HORIZONTAL_2',
  Vertical2 = 'END_FRAME_VERTICAL_2',
  Horizontal3 = 'END_FRAME_HORIZONTAL_3',
  Vertical3 = 'END_FRAME_VERTICAL_3',
  Horizontal4 = 'END_FRAME_HORIZONTAL_4',
  Vertical4 = 'END_FRAME_VERTICAL_4',
  Horizontal5 = 'END_FRAME_HORIZONTAL_5',
  Vertical5 = 'END_FRAME_VERTICAL_5',
}
