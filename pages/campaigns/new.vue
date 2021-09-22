<template>
  <v-container>
    <v-col>
      <h1>{{ title }}</h1>
      <v-divider width="400px"/>
    </v-col>

    <v-col class="col-12 col-lg-8 col-xl-7 mx-auto">
      <v-stepper non-linear v-model="step">
        <v-stepper-header>
          <v-stepper-step
            step="1"
            editable
            edit-icon="mdi-check"
            :complete="campaign.isComplete"
            :color="campaign.isComplete ? 'success' : 'primary'"
          >
            Кампания
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            step="2"
            edit-icon="mdi-check"
            :editable="campaign.isComplete"
            :complete="adGroup.isComplete"
            :color="adGroup.isComplete ? 'success' : 'primary'"
          >
            Группа объявлений
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            step="3"
            edit-icon="mdi-check"
            :editable="campaign.isComplete && adGroup.isComplete"
            :complete="ad.isComplete"
            :color="ad.isComplete ? 'success' : 'primary'"
          >
            Объявления
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-container>
              <!--<v-row class="px-0">-->
              <!--  <v-col class="flex-grow-1">-->
              <!--    <v-text-field-->
              <!--      dense-->
              <!--      outlined-->
              <!--      hide-details-->
              <!--      label="Название кампании"-->
              <!--      v-model="campaign.name"-->
              <!--    ></v-text-field>-->
              <!--  </v-col>-->
              <!--</v-row>-->

              <v-row>
                <v-col>
                  <v-autocomplete
                    dense
                    outlined
                    multiple
                    small-chips
                    hide-details
                    deletable-chips
                    item-value="id"
                    item-text="name"
                    :items="advertisers"
                    v-model="selectedAdvertisers"
                    no-data-text="Нет рекламных аккаунтов"
                    label="Рекламные аккаунты (максимум 100)"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="auto">
                  <v-btn-toggle
                    color="primary"
                    v-model="campaign.objective"
                    @change="adGroup.optimizationGoal = null"
                  >
                    <v-btn large :value="enums.campaignType.conversions">Конверсии</v-btn>
                    <v-btn large :value="enums.campaignType.traffic">Трафик</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="text-right">
                  <v-btn
                    outlined
                    class="px-5"
                    color="success"
                    @click="saveCampaign"
                    :disabled="isCampaignNextDisabled"
                  >
                    Далее
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-container>
              <!--<v-row>-->
              <!--  <v-col>-->
              <!--    <v-text-field-->
              <!--      dense-->
              <!--      outlined-->
              <!--      hide-details-->
              <!--      label="Название группы объявлений"-->
              <!--      v-model="adGroup.name"-->
              <!--    ></v-text-field>-->
              <!--  </v-col>-->
              <!--</v-row>-->

              <v-row
                class="justify-space-between"
                v-if="campaign.objective === enums.campaignType.conversions"
              >
                <v-col>
                  <v-alert
                    border="left"
                    dense
                    outlined
                    prominent
                    type="warning"
                  >
                    На выбранных аккаунтах должны быть ровно 1 настроенный пиксель и 1 событие. Не подходящие под этот
                    критерий аккаунты будут скипаться.
                  </v-alert>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h4>Пол</h4>
                  <v-btn-toggle
                    dense
                    mandatory
                    color="primary"
                    v-model="adGroup.gender"
                  >
                    <v-btn :value="enums.gender.mix">Mix</v-btn>
                    <v-btn :value="enums.gender.male">Male</v-btn>
                    <v-btn :value="enums.gender.female">Female</v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col>
                  <h4>Возраст</h4>
                  <v-btn-toggle
                    dense
                    multiple
                    mandatory
                    color="primary"
                    v-model="adGroup.age"
                    @change="validateAge"
                  >
                    <v-btn :value="enums.age.all">No Limit</v-btn>
                    <v-btn :value="enums.age.age1">13-17</v-btn>
                    <v-btn :value="enums.age.age2">18-24</v-btn>
                    <v-btn :value="enums.age.age3">25-34</v-btn>
                    <v-btn :value="enums.age.age4">35-44</v-btn>
                    <v-btn :value="enums.age.age5">45-54</v-btn>
                    <v-btn :value="enums.age.age6">55+</v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>

              <v-divider class="my-5"></v-divider>

              <v-row>
                <v-col>
                  <v-select
                    dense
                    outlined
                    multiple
                    small-chips
                    hide-details
                    deletable-chips
                    :items="location"
                    v-model="adGroup.location"
                    label="Гео #TODO Treeview регионов"
                  ></v-select>
                </v-col>

                <v-col>
                  <v-select
                    dense
                    outlined
                    multiple
                    small-chips
                    hide-details
                    deletable-chips
                    label="Языки"
                    :items="languages"
                    v-model="adGroup.languages"
                    @change="validateLanguage"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h4>Цель оптимизации</h4>
                  <v-btn-toggle
                    dense
                    mandatory
                    color="primary"
                    :key="campaign.objective"
                    v-model="adGroup.optimizationGoal"
                  >
                    <v-btn
                      v-if="campaign.objective === enums.campaignType.conversions"
                      :value="enums.optimizationGoal.conversion"
                    >
                      Conversion
                    </v-btn>
                    <v-btn :value="enums.optimizationGoal.click">Click</v-btn>
                  </v-btn-toggle>
                </v-col>

                <v-col>
                  <h4>Bid-стратегия</h4>
                  <v-slide-x-transition mode="out-in">
                    <v-btn-toggle
                      dense
                      mandatory
                      color="primary"
                      :key="adGroup.optimizationGoal"
                      v-model="adGroup.bidType"
                      v-if="adGroup.optimizationGoal === enums.optimizationGoal.click"
                    >
                      <v-btn :value="enums.bidType.cap">Bid Cap</v-btn>
                      <v-btn :value="enums.bidType.lowest">Lowest Cost</v-btn>
                    </v-btn-toggle>

                    <v-btn-toggle
                      dense
                      mandatory
                      color="primary"
                      v-model="adGroup.bidType"
                      v-else
                    >
                      <v-btn :value="enums.bidType.cap">Bid Cap</v-btn>
                    </v-btn-toggle>
                  </v-slide-x-transition>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-text-field
                    dense
                    outlined
                    hide-details
                    suffix="RUB"
                    type="number"
                    label="Дневной бюджет (min 2000₽)"
                    v-model="adGroup.budget"
                  ></v-text-field>
                </v-col>

                <v-scroll-x-transition mode="out-in">
                  <v-col cols="6" v-if="adGroup.bidType === enums.bidType.cap">
                    <v-text-field
                      dense
                      outlined
                      hide-details
                      suffix="RUB"
                      type="number"
                      label="Ставка (Bid)"
                      v-model="adGroup.bid"
                    ></v-text-field>
                  </v-col>
                </v-scroll-x-transition>
              </v-row>

              <v-row class="text-right mt-3">
                <v-col>
                  <v-btn
                    outlined
                    color="success"
                    @click="saveAdGroup"
                    :disabled="isAdGroupNextDisabled"
                  >
                    Далее
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-list nav>
                    <v-list-item-group
                      mandatory
                      v-model="ad.currentAd"
                    >
                      <v-slide-y-transition group>
                          <v-row
                            class="align-center"
                            v-for="(adEntity, index) in ad.ads"
                            :key="index"
                          >
                            <v-col cols="9" class="py-1">
                              <v-list-item class="col-auto px-5">
                                <v-list-item-title>{{ adEntity.name }}</v-list-item-title>
                              </v-list-item>
                            </v-col>

                            <v-col class="pa-0">
                              <v-btn icon>
                                <v-icon
                                  color="primary"
                                  @click="cloneAd(index)"
                                >
                                  mdi-content-copy
                                </v-icon>
                              </v-btn>

                              <v-btn icon>
                                <v-icon
                                  color="error"
                                  @click="removeAd(index)"
                                >
                                  mdi-close-thick
                                </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                      </v-slide-y-transition>
                    </v-list-item-group>

                    <v-list-item-group
                      mandatory
                      value="0"
                      class="mt-4"
                      color="success"
                    >
                      <v-list-item
                        value="0"
                        class="justify-center"
                        @click="createAd"
                      >
                        <v-icon left>mdi-plus-circle</v-icon>
                        Добавить объявление
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>

                <v-divider vertical></v-divider>

                <v-slide-x-transition mode="out-in">
                  <v-col
                    :key="ad.currentAd"
                    v-if="!!ad.ads[ad.currentAd]"
                  >
                    <v-col>
                      <v-text-field
                        dense
                        outlined
                        hide-details
                        label="Название объявления"
                        v-model="ad.ads[ad.currentAd].name"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-file-input
                        dense
                        outlined
                        show-size
                        hide-details
                        label="Видео креатив"
                        accept=".mp4,.mov,.mpeg,.3gp,.avi"
                        :disabled="ad.uploadStatus.isVideoCreativeUploading || isVideoCreativeUploaded"
                        v-model="ad.ads[ad.currentAd].assets.videoCreative"
                      ></v-file-input>

                      <v-input
                        type="hidden"
                        class="d-none"
                        v-model="ad.ads[ad.currentAd].videoCreative"
                      ></v-input>
                    </v-col>

                    <v-col>
                      <v-btn
                        plain
                        outlined
                        :loading="ad.uploadStatus.isVideoCreativeUploading"
                        :color="isVideoCreativeUploaded ? 'success' : 'primary'"
                        :disabled="!isVideoCreativeUploadAllowed"
                        @click="!isVideoCreativeUploaded ? uploadCreative() : null"
                      >
                        <v-icon left>
                          {{ isVideoCreativeUploaded ? 'mdi-cloud-check' : 'mdi-cloud-upload' }}
                        </v-icon>
                        {{ isVideoCreativeUploaded ? 'Загружено' : 'Загрузить' }}
                      </v-btn>

                      <v-btn
                        plain
                        outlined
                        color="error"
                        @click="clearCreative"
                        :disabled="!ad.ads[ad.currentAd].videoCreative && !ad.ads[ad.currentAd].assets.videoCreative"
                      >
                        <v-icon left>
                          mdi-delete
                        </v-icon>
                        Очистить
                      </v-btn>

                      <v-tooltip
                        bottom
                        max-width="200"
                        v-if="isVideoSizeExceeded"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-on="on"
                            v-bind="attrs"
                            color="error"
                            class="ml-3 pointer"
                          >
                            mdi-alert-octagon
                          </v-icon>
                        </template>

                        <span>
                          Максимальный размер видео 100 МБ.
                        </span>
                      </v-tooltip>
                    </v-col>

                    <!-- <v-col>-->
                    <!--   <v-select-->
                    <!--     dense-->
                    <!--     outlined-->
                    <!--     hide-details-->
                    <!--     :items="[]"-->
                    <!--     label="Креатив"-->
                    <!--     append-outer-icon="mdi-refresh"-->
                    <!--     no-data-text="Нет добавленных креативов"-->
                    <!--     @click:click:append-outer=""-->
                    <!--     v-model="ad.ads[ad.currentAd].creative"-->
                    <!--   ></v-select>-->
                    <!-- </v-col>-->

                    <v-divider></v-divider>

                    <v-col>
                      <v-text-field
                        dense
                        outlined
                        hide-details
                        label="Отображаемое имя"
                        v-model="ad.ads[ad.currentAd].title"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-textarea
                        dense
                        outlined
                        hide-details
                        rows="3"
                        label="Текст"
                        v-model="ad.ads[ad.currentAd].text"
                      ></v-textarea>
                    </v-col>

                    <v-col>
                      <v-select
                        dense
                        outlined
                        hide-details
                        :items="callsToAction"
                        label="Призыв к действию"
                        v-model="ad.ads[ad.currentAd].callToAction"
                      ></v-select>
                    </v-col>

                    <v-col>
                      <v-text-field
                        dense
                        outlined
                        hide-details
                        label="URL-адрес"
                        v-model="ad.ads[ad.currentAd].landingPageUrl"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-file-input
                        dense
                        outlined
                        show-size
                        hide-details
                        label="Изображение профиля"
                        accept=".png,.jpg,.jpeg"
                        :disabled="ad.uploadStatus.isProfileImageUploading || isProfileImageUploaded"
                        v-model="ad.ads[ad.currentAd].assets.profileImage"
                      ></v-file-input>

                      <v-input
                        type="hidden"
                        class="d-none"
                        v-model="ad.ads[ad.currentAd].profileImage"
                      ></v-input>
                    </v-col>

                    <v-col>
                      <v-btn
                        plain
                        outlined
                        :loading="ad.uploadStatus.isProfileImageUploading"
                        :color="isProfileImageUploaded ? 'success' : 'primary'"
                        :disabled="!isProfileImageUploadAllowed"
                        @click="!isProfileImageUploaded ? uploadProfileImage() : null"
                      >
                        <v-icon left>
                          {{ isProfileImageUploaded ? 'mdi-cloud-check' : 'mdi-cloud-upload' }}
                        </v-icon>
                        {{ isProfileImageUploaded ? 'Загружено' : 'Загрузить' }}
                      </v-btn>

                      <v-btn
                        plain
                        outlined
                        color="error"
                        @click="clearProfileImage"
                        :disabled="!ad.ads[ad.currentAd].profileImage && !ad.ads[ad.currentAd].assets.profileImage"
                      >
                        <v-icon left>
                          mdi-delete
                        </v-icon>
                        Очистить
                      </v-btn>

                      <v-tooltip
                        bottom
                        max-width="200"
                        v-if="isImageSizeExceeded"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-on="on"
                            v-bind="attrs"
                            color="error"
                            class="ml-3 pointer"
                          >
                            mdi-alert-octagon
                          </v-icon>
                        </template>

                        <span>
                          Максимальный размер изображения 50 КБ.
                        </span>
                      </v-tooltip>
                    </v-col>
                  </v-col>
                </v-slide-x-transition>
              </v-row>

              <v-row class="text-right mt-7">
                <v-col>
                  <v-btn
                    outlined
                    color="success"
                    @click="saveAndUpload"
                    :loading="isProcessing"
                    :disabled="isAdNextDisabled || isProcessing"
                  >
                    Сохранить и загрузить
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-container>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import {
  EAdvertiserStatus,
  EAdvertisingObjective,
  EAudienceAgeRange,
  EAudienceGender,
  EAudienceGeoLocation,
  EAudienceLanguage,
  EBiddingStrategy, ECallToAction,
  EOptimizationGoal,
  EPixelEvent,
} from '@/api/tiktok/types'
import { EMediaLibraryObject } from '@/api/media-library/enums'

const LOCATION = [
  { text: 'Russia', value: EAudienceGeoLocation.Russia },
  { text: 'Egypt', value: EAudienceGeoLocation.Egypt },
  { text: 'Indonesia', value: EAudienceGeoLocation.Indonesia },
  { text: 'Japan', value: EAudienceGeoLocation.Japan },
  { text: 'Korea', value: EAudienceGeoLocation.Korea },
  { text: 'Saudi Arabia', value: EAudienceGeoLocation.SaudiArabia },
  { text: 'Turkey', value: EAudienceGeoLocation.Turkey },
  { text: 'Thailand', value: EAudienceGeoLocation.Thailand },
  { text: 'United Arab Emirates', value: EAudienceGeoLocation.UnitedArabEmirates },
]

const LANGUAGE = [
  { text: 'No Limit', value: 'all' },
  { text: 'Russian', value: EAudienceLanguage.ru },
  { text: 'Ukrainian', value: EAudienceLanguage.uk },
  { text: 'English', value: EAudienceLanguage.en },
  { text: 'German', value: EAudienceLanguage.de },
  { text: 'French', value: EAudienceLanguage.fr },
  { text: 'Italian', value: EAudienceLanguage.it },
  { text: 'Portuguese', value: EAudienceLanguage.pt },
  { text: 'Polish', value: EAudienceLanguage.pl },
  { text: 'Czech', value: EAudienceLanguage.cs },
  { text: 'Spanish', value: EAudienceLanguage.es },
  { text: 'Romanian', value: EAudienceLanguage.ro },
  { text: 'Hungarian', value: EAudienceLanguage.hu },
  { text: 'Swedish', value: EAudienceLanguage.sv },
  { text: 'Finnish', value: EAudienceLanguage.fi },
  { text: 'Vietnamese', value: EAudienceLanguage.vi },
  { text: 'Thai', value: EAudienceLanguage.th },
  { text: 'Japanese', value: EAudienceLanguage.ja },
  { text: 'Korean', value: EAudienceLanguage.ko },
  { text: 'Traditional Chinese', value: EAudienceLanguage.zhHant },
  { text: 'Hindi', value: EAudienceLanguage.hi },
  { text: 'Malay', value: EAudienceLanguage.ms },
  { text: 'Gujarati', value: EAudienceLanguage.gu },
  { text: 'Marathi', value: EAudienceLanguage.mr },
  { text: 'Kannada', value: EAudienceLanguage.kn },
  { text: 'Bengali', value: EAudienceLanguage.bn },
  { text: 'Oriya', value: EAudienceLanguage.or },
  { text: 'Tamil', value: EAudienceLanguage.ta },
  { text: 'Malayalam', value: EAudienceLanguage.ml },
  { text: 'Punjabi', value: EAudienceLanguage.pa },
  { text: 'Telugu', value: EAudienceLanguage.te },
  { text: 'Turkish', value: EAudienceLanguage.tr },
  { text: 'Arabic', value: EAudienceLanguage.ar },
  { text: 'Greek', value: EAudienceLanguage.gr },
  { text: 'Khmer', value: EAudienceLanguage.km },
  { text: 'Indonesian', value: EAudienceLanguage.id },
  { text: 'Assamese', value: EAudienceLanguage.as },
  { text: 'Haryanvi', value: EAudienceLanguage.bgc },
  { text: 'Rajasthani', value: EAudienceLanguage.raj },
  { text: 'Bihari', value: EAudienceLanguage.bh },
  { text: 'Dutch', value: EAudienceLanguage.nl },
  { text: 'Hebrew', value: EAudienceLanguage.he },
]

export default {
  layout: 'dashboard',
  head: () => ({
    title: 'Новый залив',
  }),
  props: {
    id: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    title: 'Новый залив',
    step: 1,
    timestamp: moment().format('YYYYMMDDhhmmss'),
    isProcessing: false,
    advertisers: [], // Список рекламных аккаунтов
    selectedAdvertisers: [], // Выбранные к заливу рекламные кабинеты
    location: LOCATION,
    languages: LANGUAGE,
    pixelEvents: Object.values(EPixelEvent),
    callsToAction: Object.values(ECallToAction).map((cta) => ({ text: cta, value: cta })), // TODO
    // Шаг настройки кампании
    campaign: {
      name: '',
      objective: null,
      isAutoName: false,
      isComplete: false,
    },
    // Шаг настройки адсета
    adGroup: {
      name: '',
      pixelEvent: null, // TODO с пикселями персонально разобраться
      gender: EAudienceGender.Mix,
      age: [null],
      location: [EAudienceGeoLocation.Russia], // Россия
      languages: [EAudienceLanguage.ru], // Русский язык
      optimizationGoal: EOptimizationGoal.Conversion, // Клики / конверсии
      bidType: EBiddingStrategy.Manual,
      bid: 0, // TODO Optimal bidding
      budget: 2000,
      isComplete: false,
    },
    // Шаг настройки объявлений
    ad: {
      ads: [],
      currentAd: null,
      isComplete: false,

      // Состояние загрузки (загружается ли в данный момент?)
      uploadStatus: {
        isVideoCreativeUploading: false,
        isProfileImageUploading: false,
      },
    },

    // Карта дубликатов объявлений, чтобы называть их _1, _2 и т.д.
    adDubs: new Map(), // <string, number>

    // Мэппим нативные значения enums тиктока для использования в нашем UI
    enums: {
      campaignType: {
        traffic: EAdvertisingObjective.Traffic,
        conversions: EAdvertisingObjective.Conversions,
      },
      gender: {
        mix: EAudienceGender.Mix,
        male: EAudienceGender.Male,
        female: EAudienceGender.Female,
      },
      age: {
        all: null, // Если No Limit - значит не передаём ничего, что означает все возрастные категории
        age1: EAudienceAgeRange.Age13_17,
        age2: EAudienceAgeRange.Age18_24,
        age3: EAudienceAgeRange.Age25_34,
        age4: EAudienceAgeRange.Age35_44,
        age5: EAudienceAgeRange.Age45_54,
        age6: EAudienceAgeRange.Age55_100,
      },
      optimizationGoal: {
        click: EOptimizationGoal.Click,
        conversion: EOptimizationGoal.Conversion,
      },
      bidType: {
        cap: EBiddingStrategy.Manual,
        lowest: EBiddingStrategy.DisableBidControl,
      },
    },
  }),
  created() {
    this.$TikTokAccount
      .list()
      .then(({ list }) => list.map((account) => {
        this.advertisers = this.advertisers.concat(
          // Показываем в списке только активные аккаунты
          account.advertisers.filter((advert) => advert.status === EAdvertiserStatus.Active)
        )
      }))
      .catch(({ message }) => this.$notifier.show(message, 'error'))
  },
  computed: {
    isCampaignNextDisabled() {
      return this.campaign.objective === null || this.selectedAdvertisers.length === 0
    },
    isAdGroupNextDisabled() {
      const { bid, bidType, budget } = this.adGroup
      return bidType === EBiddingStrategy.Manual
        ? budget < 2000 || bid <= 0
        : budget < 2000
    },
    isAdNextDisabled() {
      const { ad } = this
      return ad.ads.length === 0 || !ad.ads.reduce((prev, ad) => !!ad.videoCreative && prev, true)
    },
    isVideoSizeExceeded() {
      const { ad } = this
      return ad.ads[ad.currentAd].assets.videoCreative?.size > 100 * 1024 * 1024
    },
    isImageSizeExceeded() {
      const { ad } = this
      return ad.ads[ad.currentAd].assets.profileImage?.size >= 50 * 1024
    },
    isVideoCreativeUploadAllowed() {
      const { ad } = this
      return ad.ads[ad.currentAd].assets.videoCreative && !this.isVideoSizeExceeded
    },
    isProfileImageUploadAllowed() {
      const { ad } = this
      return ad.ads[ad.currentAd].assets.profileImage && !this.isImageSizeExceeded
    },
    isVideoCreativeUploaded() {
      const { ad } = this
      return !!ad.ads[ad.currentAd].videoCreative
    },
    isProfileImageUploaded() {
      const { ad } = this
      return !!ad.ads[ad.currentAd].profileImage
    }
  },
  methods: {
    getTimestamp(ms) {
      // Метка с микросекундами или без
      return ms
        ? moment().format('YYYYMMDDhhmmssSS')
        : moment().format('YYYYMMDDhhmmss')
    },
    saveCampaign() {
      if (!this.isCampaignNextDisabled) {
        let type = ''
        switch (this.campaign.objective) {
          case EAdvertisingObjective.Traffic:
            type = 'Трафик'
            break
          case EAdvertisingObjective.Conversions:
            type = 'Конверсии'
            break
          default:
            type = 'Рекламная кампания'
            break
        }

        if (!this.campaign.name) {
          this.campaign.name = `${ type }${ this.timestamp }`
        }
        this.campaign.isComplete = true
        this.nextStep()
      }
    },
    saveAdGroup() {
      if (!this.isAdGroupNextDisabled) {
        if (!this.adGroup.name) {
          this.adGroup.name = 'Группа объявлений' + this.timestamp
        }
        this.adGroup.isComplete = true
        this.nextStep()
      }
    },
    saveAndUpload() {
      if (!this.isAdNextDisabled) {
        this.ad.isComplete = true
        this.isProcessing = true
        this.$Campaign
          .create({
            advertisers: this.selectedAdvertisers,
            campaign: this.campaign,
            adGroup: this.adGroup,
            ads: this.ad.ads,
          })
          .then((res) => {
            this.isProcessing = false
            this.$notifier.show('Залив кампании ' + this.campaign.name + ' был запущен.', 'info')
            this.$router.push('/campaigns')
          })
          .catch((err) => this.$notifier.show(err.message, 'error'))
          .then(() => {
            this.isProcessing = false
            this.timestamp = this.getTimestamp()
          })
      }
    },
    nextStep() {
      if (this.step < 3) {
        this.step++
      }
    },
    validateAge() {
      const { age } = this.adGroup

      // Если No Limit - то убираем выделение со всех других возрастных категорий
      if (age[age.length - 1] === 0) {
        this.adGroup.age = [0]
      }
      // Или если выбрали какую-то возрастную категорию, убираем выделение с No Limit
      else if (age[0] === 0) {
        this.adGroup.age = [age[1]]
      }
    },
    validateLanguage() {
      const { languages } = this.adGroup

      // Если последним селектом выбрали все языки - удаляем остальные выбранные
      if (languages[languages.length - 1] === LANGUAGE[0].value) {
        this.adGroup.languages = [LANGUAGE[0].value]
      }
      // Или же если были выбраны все языки, а потом мы выбираем какой-то конкретный - убираем вайлдкард язык
      else if (languages[0] === LANGUAGE[0].value) {
        this.adGroup.languages = [languages[1]]
      }
    },
    createAd() {
      // TODO вынести в тайпинги?
      // Устанавливаем потолок в 100 объявлений на залив
      if (this.ad.ads.length >= 100) {
        this.$notifier.show('Достигнут предел в 100 объявлений.')
        return
      }

      // Добавляем новое объявление
      this.ad.ads.push({
        name: 'Объявление' + Date.now(),
        text: '',
        title: '',
        landingPageUrl: '',
        videoCreative: null, // SHA-256 видеокреатива в нашей системе
        profileImage: null, // SHA-256 изображения профиля в нашей системе
        callToAction: null,

        // Файлы для предварительной загрузки в нашу медиа библиотеку
        assets: {
          videoCreative: null,
          profileImage: null,
        },
      })

      // Переносим выделение на добавленный объект
      this.ad.currentAd = this.ad.ads.length - 1
    },
    cloneAd(index) {
      // Клонируем объект, чтобы поменять ему имя. А то у мальчика нет имени.
      const ad = _.cloneDeep(this.ad.ads[index])

      // Получаем индекс дубликата. Если дубликата пока нет - по умолчанию индекс 1
      const dubIndex = this.adDubs.get(ad.name) || 1

      // Инкрементируем индекс и сохраняем его в мапу дубликатов.
      this.adDubs.set(ad.name, dubIndex + 1)

      // Прописываем имя объявы.
      ad.name += '_' + dubIndex

      /**
       * Вставляем дубликат прямо под оригинал. Массив может быть максимум up to 100 элементов, поэтому не тяжело.
       * В данном случае последний дубликат вставляется под оригинал, т.е. выше остальных дубликатов. При удалении
       * какого-либо дубля мы никак это не запоминаем в adDubs мапе, да и не нужно. Этот вариант самый простой и удобный.
       * Кейс, в котором нужно размещать дубли один под другим, а не над другим, как сейчас, более сложный, т.к. при
       * удалении хоть одного дубля (не обязательно 1го или последнего) это дело нужно будет где-то дополнительно
       * запоминать, что является дополнительной сложностью.
       */
      this.ad.ads.splice(index + 1, 0, ad)
    },
    removeAd(index) {
      // Если удаляемый объект выше текущего выделенного - оставляем текущий нетронутым, иначе сдвигаем текущий на 1
      this.ad.currentAd = this.ad.currentAd < index
        ? this.ad.currentAd
        : this.ad.currentAd - 1
      this.ad.ads.splice(index, 1)
    },
    uploadCreative() {
      this.ad.uploadStatus.isVideoCreativeUploading = true
      this.$MediaLibrary
        .upload({
          type: EMediaLibraryObject.VideoCreative,
          file: this.ad.ads[this.ad.currentAd].assets.videoCreative,
        })
        .then(({ sha256 }) => this.ad.ads[this.ad.currentAd].videoCreative = sha256)
        .catch((err) => this.$notifier.show(err.message, 'error'))
        .then(() => this.ad.uploadStatus.isVideoCreativeUploading = false)
    },
    clearCreative() {
      this.ad.ads[this.ad.currentAd].videoCreative = null
      this.ad.ads[this.ad.currentAd].assets.videoCreative = null
    },
    uploadProfileImage() {
      this.ad.uploadStatus.isProfileImageUploading = true
      this.$MediaLibrary
        .upload({
          type: EMediaLibraryObject.ProfileImage,
          file: this.ad.ads[this.ad.currentAd].assets.profileImage,
        })
        .then(({ sha256 }) => this.ad.ads[this.ad.currentAd].profileImage = sha256)
        .catch((err) => this.$notifier.show(err.message, 'error'))
        .then(() => this.ad.uploadStatus.isProfileImageUploading = false)
    },
    clearProfileImage() {
      this.ad.ads[this.ad.currentAd].profileImage = null
      this.ad.ads[this.ad.currentAd].assets.profileImage = null
    },
  },
}
</script>

<style lang="scss" scoped>
.text-success {
  color: #64dd17 !important;
}
</style>
