import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const PickCountType = z.enum(["sympathy", "suggestion", "expectancy"]);
const ContentTypeDto = z.enum(["none", "pick", "series", "secret", "live", "poll", "all"]);
const ScrapTypeDto = z.enum(["pick", "series", "secret", "live", "all"]);
const FollowDto = z.object({ followed: z.string().default("<string>"), isFollowed: z.boolean().default("<boolean>") }).passthrough();
const UpdateFollow = z.object({ masterId: z.string().default("<string>"), round: z.number().int().default(<integer>) }).passthrough();
const updateFollow_Body = z.object({ follow: z.array(UpdateFollow).min(2).max(2) }).passthrough();
const UpdateFollowResponseDto = z.object({ followed: z.string().default("<string>"), isFollowed: z.boolean().default("<boolean>"), round: z.number().int().nullish().default(<integer>) }).passthrough();
const patchProfileEditScreen_Body = z.object({ portraitImage: z.instanceof(File).nullable().default("<binary>"), nickName: z.string().nullable().default("<string>"), password: z.string().nullable().default("<string>"), phoneNumber: z.string().nullable().default("<string>") }).partial().passthrough();
const LoginTypeDto = z.enum(["direct", "apple", "google", "naver", "kakao"]);
const PatchIsReadByMasterNoticeDto = z.object({ masterNoticeId: z.string().default("<string>"), didRead: z.boolean().default("<boolean>") }).passthrough();
const patchReadNotice_Body = z.object({ noticeId: z.array(z.string().default("<string>")).min(2).max(2) }).passthrough();
const NoticeHistoryDto = z.object({ noticeId: z.string().default("<string>"), didRead: z.boolean().default("<boolean>") }).passthrough();
const patchFormattingStyle_Body = z.object({ fontSize: z.number().default(<double>), lineHeight: z.number().default(<double>) }).passthrough();
const PatchClubLetterByReadValue = z.object({ masterId: z.string().default("<string>"), didRead: z.boolean().default("<boolean>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const PollCardModel = z.object({ title: z.string().default("<string>"), joinCount: z.number().int().default(<integer>) }).passthrough();
const FinanceTypeDto = z.enum(["none", "domesticIndex", "overseasIndex", "domesticCommodityIndex", "overseasCommodityIndex", "exchangeRate", "domesticStock", "overseasStock"]);
const FinanceCardModel = z.object({ id: z.string().default("<string>"), name: z.string().default("<string>"), index: z.number().default(<double>), changeRate: z.number().default(<double>), type: FinanceTypeDto.default("<string>"), isOpen: z.boolean().default("<boolean>"), country: z.string().default("<string>"), pending: z.boolean().default("<boolean>") }).passthrough();
const MembershipTypeDto = z.enum(["membership", "none", "unsubscribed", "premium"]);
const MasterCardModelV2 = z.object({ id: z.string().default("<string>"), name: z.string().default("<string>"), profileImage: z.string().default("<url>"), clubOfficialImage: z.string().default("<url>"), clubTextImage: z.string().default("<url>"), type: MembershipTypeDto.default("<string>"), round: z.number().int().nullish().default(<integer>), hasNew: z.boolean().default("<boolean>"), isSubscribed: z.boolean().default("<boolean>") }).passthrough();
const FeedBannerModel = z.object({ imageUrl: z.string().default("<url>"), linkUrl: z.string().default("<url>") }).passthrough();
const UserTierTypeDto = z.enum(["none", "follow", "membership"]);
const AccessStateDto = z.enum(["open", "close"]);
const MasterAccessStateDto = z.object({ club: AccessStateDto.default("open"), membership: AccessStateDto.default("open") }).passthrough();
const MembershipIntroductionType = z.enum(["masterNotice", "externalWebLink", "InternalContent"]);
const MembershipIntroductionDto = z.object({ type: MembershipIntroductionType.default("<string>"), value: z.string().default("<string>") }).passthrough();
const CareerData = z.object({ id: z.string().default("<string>"), careers: z.string().default("<string>"), round: z.number().int().default(<integer>) }).passthrough();
const getClubNoticesV2Dto = z.object({ id: z.string().default("<string>"), title: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), creator: z.string().default("<string>"), didRead: z.boolean().default("<boolean>") }).passthrough();
const IndexListTileModel = z.object({ id: z.string().default("<string>"), name: z.string().default("<string>"), isOpened: z.boolean().default("<boolean>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>"), index: z.number().default(<double>), changeValue: z.number().default(<double>), changeRate: z.number().default(<double>), type: FinanceTypeDto.default("<string>"), currency: z.string().default("<string>"), pending: z.boolean().default("<boolean>") }).passthrough();
const USER_ROLE = z.enum(["USER", "ADMIN", "MASTER", "MONITOR", "MASTER_ADMIN", "MASTER_MONITOR"]);
const UserPaymentInfos = z.object({ masterCmsId: z.string().default("<string>"), hectoCount: z.number().int().default(<integer>), usCampusCount: z.number().int().default(<integer>), oneTimeCount: z.number().int().default(<integer>) }).passthrough();
const COMMENT_CONTENT_TYPE = z.enum(["pick", "secret", "live", "poll", "unknown"]);
const ContentCommentData = z.object({ commentId: z.string().default("<string>"), parentCommentId: z.string().nullish().default("<string>"), userId: z.string().default("<string>"), userNickName: z.string().default("<string>"), userPortraitUrl: z.string().default("<url>"), userRole: USER_ROLE.default("USER"), userPaymentInfos: UserPaymentInfos, comment: z.string().default("<string>"), likeCount: z.number().int().default(<integer>), childCommentCount: z.number().int().default(<integer>), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), contentCmsId: z.string().default("<string>"), contentCmsType: COMMENT_CONTENT_TYPE.default("<string>"), isMeLike: z.boolean().default("<boolean>"), isMasterLike: z.boolean().default("<boolean>"), isMasterComment: z.boolean().default("<boolean>"), masterName: z.string().nullish().default("<string>"), masterPortraitUrl: z.string().nullish().default("<url>"), isRepliedMasterComment: z.boolean().nullish().default("<boolean>"), secretTitle: z.string().nullish().default("<string>"), secretRound: z.number().int().nullish().default(<integer>), isMeComment: z.boolean().default("<boolean>"), author: z.string().default("<string>"), mark: z.string().default("<string>"), profileImage: z.string().default("<string>"), memberSipSubscription: z.string().default("<string>") }).passthrough();
const CMS_TYPE = z.enum(["pick", "secret", "series"]);
const postCommentV3_Body = z.object({ contentCmsId: z.string().default("<string>"), contentType: CMS_TYPE.default("<string>"), value: z.string().default("<string>"), parentCommentId: z.string().nullish().default("<string>") }).passthrough();
const CommentIdData = z.object({ commentId: z.string().default("<string>"), parentCommentId: z.string().nullish().default("<string>"), userId: z.string().default("<string>"), masterId: z.string().default("<string>"), contentId: z.string().default("<string>"), contentCmsId: z.string().default("<string>"), contentType: CMS_TYPE.default("<string>") }).passthrough();
const MasterDetailCareer = z.object({ careers: z.string().default("<string>"), round: z.number().int().default(<integer>) }).passthrough();
const MASTER_STATUS = z.enum(["ACTIVE", "INACTIVE", "PENDING"]);
const MasterOpenStatus = z.object({ clubStatus: MASTER_STATUS.default("<string>"), membershipStatus: MASTER_STATUS.default("<string>") }).passthrough();
const MembershipIntroduction = z.object({ type: z.string().default("<string>"), value: z.string().default("<string>") }).passthrough();
const Master = z.object({ cmsId: z.string().default("<string>"), name: z.string().default("<string>"), description: z.string().default("<string>"), masterDetailIntroduction: z.string().default("<string>"), masterDetailKeyCareer: z.string().default("<string>"), cumulativeDonation: z.number().int().default(<integer>), clubLetter: z.string().nullish().default("<string>"), companyFullName: z.string().nullish().default("<string>"), companyShortName: z.string().nullish().default("<string>"), companyIcon: z.string().nullish().default("<url>"), profileImage: z.string().default("<url>"), clubOfficialImage: z.string().default("<url>"), recommendTextImage: z.string().default("<url>"), recommendImage: z.string().default("<url>"), clubTextImage: z.string().default("<url>"), masterDetailCareers: z.array(MasterDetailCareer).min(2).max(2), productPageImage: z.string().nullish().default("<url>"), masterStatus: MasterOpenStatus, membershipIntroduction: MembershipIntroduction.nullish(), recommendRound: z.number().int().nullish().default(<integer>), isCommentBlock: z.boolean().default("<boolean>") }).passthrough();
const UserLevelTypeDto = z.enum(["beginner", "explorer", "investor", "analyst", "finple"]);
const InterestType = z.enum(["secondaryBattery", "realty", "investment", "domesticStock", "economicTheory", "foreignStock", "cryptoCurrency", "companyAnalysis", "macroEconomics", "personalFinance", "safeAsset", "none"]);
const MembershipStatusDto = z.enum(["active", "inactive"]);
const TransactionStatus = z.enum(["purchased_success", "purchased_fail", "subscription_cancelled", "subscription_cancel_withdraw", "subscription_changed"]);
const MyMembershipPaymentProviderDto = z.enum(["google", "apple", "hecto", "us-campus", "us-insight"]);
const PaymentMethodType = z.enum(["subscription", "onetimepurchase"]);
const MyMembershipCardModelV3 = z.object({ id: z.string().default("<string>"), stsuts: MembershipStatusDto.default("<string>"), paymentStatus: TransactionStatus.default("<string>"), productId: z.string().default("<string>"), productName: z.string().default("<string>"), paymentMethod: z.string().default("<string>"), paymentMethodProvider: MyMembershipPaymentProviderDto.default("<string>"), paymentMethodInfo: z.string().default("<string>"), expiredAt: z.string().default("<string>"), daysUntilExpired: z.number().int().default(<integer>), displayPrdtNm: z.string().default("<string>"), displayClubNm: z.string().default("<string>"), masterId: z.string().default("<string>"), isUnChangeable: z.boolean().default(false), paymentMethodType: PaymentMethodType.default("<string>"), isPaymentMethodChangeable: z.boolean().default(false) }).passthrough();
const MyMembershipCardModel = z.object({ id: z.string().default("<string>"), stsuts: MembershipStatusDto.default("<string>"), paymentStatus: TransactionStatus.default("<string>"), productId: z.string().default("<string>"), productName: z.string().default("<string>"), paymentMethod: z.string().default("<string>"), paymentMethodProvider: MyMembershipPaymentProviderDto.default("<string>"), paymentMethodInfo: z.string().default("<string>"), expiredAt: z.string().default("<string>"), daysUntilExpired: z.number().int().default(<integer>), displayPrdtNm: z.string().default("<string>"), displayClubNm: z.string().default("<string>"), masterId: z.string().default("<string>"), paymentMethodType: PaymentMethodType.default("<string>") }).passthrough();
const PurchaseSuccessCardModel = z.object({ status: TransactionStatus.default("<string>"), paymentMethodProvider: z.enum(["google", "apple", "hecto"]).default("<string>"), amount: z.number().int().default(<integer>), paymentMethod: z.string().default("<string>"), paymentMethodInfo: z.string().default("<string>"), paymentDateTime: z.string().default("<string>") }).passthrough();
const PurchaseFailCardModel = z.object({ status: TransactionStatus.default("<string>"), paymentMethodProvider: z.enum(["google", "apple", "hecto"]), amount: z.number().int(), paymentMethod: z.string(), paymentMethodInfo: z.string(), paymentDateTime: z.string() }).passthrough();
const SubscriptionCancelCardModel = z.object({ status: TransactionStatus.default("<string>"), paymentMethodProvider: z.enum(["google", "apple", "hecto"]), subscriptionExpiredAt: z.string(), updateDateTime: z.string() }).passthrough();
const SubscriptionChangeCardModel = z.object({ status: TransactionStatus.default("<string>"), paymentMethodProvider: z.enum(["google", "apple", "hecto"]), statusText: z.string(), changedDisplayPrdtNm: z.string().default(""), changedDisplayClubNm: z.string().default(""), updateDateTime: z.string() }).passthrough();
const SubscriptionCancelWithdrawCardModel = z.object({ status: TransactionStatus.default("<string>"), paymentMethodProvider: z.enum(["google", "apple", "hecto"]), statusText: z.string(), updateDateTime: z.string() }).passthrough();
const HectoMethodType = z.enum(["card", "corp", "unknown"]);
const HectoCardGBType = z.literal("SSP");
const HectoCorpPayCodeType = z.enum(["KKP", "NVP"]);
const membershipProductHectoModel = z.object({ id: z.string().optional().default("<string>"), mchtTrdNo: z.string().default("<string>"), pmtPrdtNm: z.string().default("<string>"), trdAmt: z.string().default("<string>"), mchtParam: z.string().optional().default("<string>"), price: z.number().optional().default(<number>), period: z.enum(["1m", "3m", "6m", "1y"]).optional().default("<string>"), secrets: z.array(z.string().default("<string>")).min(2).max(2).optional(), lives: z.array(z.string().default("<string>")).min(2).max(2).optional(), isSecretAll: z.boolean().optional().default("<boolean>"), isLiveAll: z.boolean().optional().default("<boolean>"), displayPrdtNm: z.string().optional().default("<string>"), groupId: z.string().optional().default("<string>"), currentPaymentPrice: z.number().optional().default(<number>), nextPaymentDate: z.string().datetime({ offset: true }).optional().default("<dateTime>"), nextPaymentPrice: z.number().optional().default(<number>), isPromotionActive: z.boolean().optional().default("<boolean>"), promotionDisCountedPrice: z.number().optional().default(<number>), paymentMethodType: PaymentMethodType.optional().default("<string>") }).passthrough();
const PaymentMethodChangeType = z.enum(["FULL_PAYMENT", "PARTIAL_REFUND", "NONE"]);
const MembershipsProduct = z.object({ id: z.string().default("<string>"), name: z.string().default("<string>"), price: z.number().int().default(<integer>), paymentMethodId: z.string().default("<string>"), groupId: z.string().default("<string>"), planId: z.string().default("<string>"), masterId: z.string().default("<string>"), period: z.enum(["1m", "3m", "6m", "1y"]).default("<string>"), secrets: z.array(z.string().default("<string>")).min(2).max(2), lives: z.array(z.string().default("<string>")).min(2).max(2), isSecretAll: z.boolean().default("<boolean>"), isLiveAll: z.boolean().default("<boolean>"), displayPrdtNm: z.string().default("<string>"), displayClubNm: z.string().default("<string>") }).passthrough();
const CancelResultDto = z.enum(["success", "fail"]);
const RenewResultDto = z.enum(["success", "fail"]);
const membershipProductHectoChangeProductModel = z.object({ id: z.string().default("<string>"), price: z.number().default(<number>), displayPrdtNm: z.string().default("<string>"), secrets: z.array(z.string().default("<string>")).max(2), lives: z.array(z.string().default("<string>")).max(2), isSecretAll: z.boolean().default("<boolean>"), isLiveAll: z.boolean().default("<boolean>"), period: z.enum(["1m", "3m", "6m", "1y"]).default("<string>") }).passthrough();
const membershipProductHectoChangeModel = z.object({ product: membershipProductHectoChangeProductModel, changeState: z.string().default("<string>"), changedExpiredAt: z.string().default("<string>") }).passthrough();
const AssetsProduct = z.object({ id: z.string().default("<string>"), name: z.string().default("<string>"), price: z.number().int().default(<integer>), paymentMethodId: z.string().default("<string>"), purchaseId: z.string().default("<string>"), value: z.number().int().default(<integer>), isPopular: z.boolean().default("<boolean>"), discountPercentage: z.number().int().default(<integer>) }).passthrough();
const postAssetsProducts_Body = z.object({ transcationToken: z.string().default("<string>"), product: AssetsProduct }).passthrough();
const MyContentType = z.literal("secret");
const postMyContents_Body = z.object({ contentId: z.string().default("<string>"), contentType: MyContentType.default("<string>") }).passthrough();
const MyContentDto = z.object({ contentId: z.string().default("<string>"), contentType: MyContentType.default("<string>") }).passthrough();
const GetRedDotResponseDto = z.object({ hasNew: z.boolean().default("<boolean>") }).passthrough();
const InterestRankListTileModel = z.object({ title: InterestType.default("<string>"), rank: z.number().int().default(<integer>) }).passthrough();
const ContentCardTypeDto = z.enum(["content", "pick", "secret", "series", "live"]);
const SeriesCardDto = z.object({ id: z.string().default("<string>"), type: ContentCardTypeDto.default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), creatorName: z.string().default("<string>"), creatorPortraitUrl: z.string().default("<url>"), creatorClubId: z.string().default("<string>"), title: z.string().default("<string>"), detail: z.string().default("<string>"), isScraped: z.boolean().default("<boolean>"), masterCompanyFullName: z.string().nullish().default("<string>"), masterCompanyShortName: z.string().nullish().default("<string>"), masterCompanyIconURL: z.string().nullish().default("<string>"), totalEpisodeCount: z.number().int().default(<integer>), coverImageUrl: z.string().url().default("<uri>"), rateCount: z.number().int().default(<integer>) }).passthrough();
const TransactionTypeDto = z.enum(["none", "free", "prePurchased", "purchased"]);
const SecretTypeDto = z.enum(["none", "article", "video", "audio"]);
const ContentAuthorityStatusDto = z.enum(["none", "membership", "purchased"]);
const SecretBriefCardDtoV3 = z.object({ id: z.string().default("<string>"), title: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>"), price: z.number().int().default(<integer>), type: TransactionTypeDto.default("<string>"), episodeCount: z.number().int().default(<integer>), didRead: z.boolean().default("<boolean>"), contentType: SecretTypeDto.default("<string>"), hasNew: z.boolean().default("<boolean>"), contentAuthorityStatus: ContentAuthorityStatusDto.default("<string>") }).passthrough();
const LOGIN_TYPE = z.enum(["direct", "google", "apple", "naver", "kakao", "admin"]);
const DeviceTypeDto = z.enum(["APNS", "GCM"]);
const PermissionStatusTypeDto = z.enum(["unknown", "denied", "permanentlyDenied", "granted", "restricted", "limited", "provisional"]);
const postDeviceV3_Body = z.object({ deviceType: DeviceTypeDto.default("<string>"), deviceToken: z.string().default("<string>"), deviceModel: z.string().default("<string>"), deviceId: z.string().default("<string>"), permissionStatus: PermissionStatusTypeDto.default("<string>") }).passthrough();
const PushTopicType = z.enum(["MASTER", "EVENT"]);
const PushTopicDto = z.object({ name: PushTopicType.default("<string>"), isSubscribed: z.boolean().default("<boolean>"), "_id": z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const TokenDto = z.object({ token: z.string().default("<string>"), expires: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const ProviderTypeDto = z.enum(["direct", "apple", "google", "naver", "kakao"]);
const validateAuthCode_Body = z.object({ phoneNumber: z.string().default("<string>"), code: z.number().int().default(<integer>), provider: ProviderTypeDto.default("<string>") }).passthrough();
const AuthCodeTypeV2Dto = z.enum(["signup", "resetPassword", "addPhone"]);
const sendAuthCodeV2_Body = z.object({ phoneNumber: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), subId: z.string().nullish().default("<string>"), type: AuthCodeTypeV2Dto.default("<string>") }).passthrough();
const directLoginV2_Body = z.object({ subId: z.string().default("<string>"), password: z.string().default("<password>") }).passthrough();
const UserRoleDto = z.enum(["user", "tester", "admin", "master"]);
const getMyAuthDto = z.object({ provider: LoginTypeDto.default("<string>"), subId: z.string().default("<string>"), id: z.string().default("<string>"), nickName: z.string().default("<string>"), portraitUrl: z.string().default("<url>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), currentAsset: z.number().int().default(<integer>), role: UserRoleDto.default("user"), isFinishedTUT: z.boolean().default("<boolean>") }).passthrough();
const DuplicateUser = z.object({ phoneNumber: z.string().default("<string>"), joinDate: z.string().default("<string>"), nickName: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>") }).passthrough();
const NaverAuthTokenDto = z.object({ accessToken: z.string().default("<string>"), expiresAt: z.string().default("<string>"), hashCode: z.number().default(<number>), refreshToken: z.string().default("<string>"), tokenType: z.string().default("<string>") }).passthrough();
const NaverAuthDto = z.object({ subId: z.string().default("<string>"), token: NaverAuthTokenDto }).passthrough();
const naverAuthWithNative_Body = z.object({ data: NaverAuthDto }).passthrough();
const LoginSuccessDto = z.object({ auth: z.boolean().default("<boolean>"), join: z.boolean().default("<boolean>"), subId: z.string().default("<string>"), accessToken: z.string().default("<string>"), accessExpires: z.string().default("<string>"), refreshToken: z.string().default("<string>"), refreshExpires: z.string().default("<string>"), shouldRecommendation: z.boolean().default("<boolean>"), userProvider: z.enum(["direct", "google", "apple", "naver", "kakao"]).default("<string>"), userSubId: z.string().default("<string>"), userId: z.string().default("<string>"), userNickName: z.string().default("<string>"), userPortraitUrl: z.string().default("<url>"), userPhoneNumber: z.string().default("<string>"), userEmail: z.string().email().nullable().default("<email>"), userRole: z.enum(["user", "tester", "admin", "master"]).default("<string>"), userIsFinishedTUT: z.boolean().default("<boolean>"), userCurrentAsset: z.string().default("<string>") }).passthrough();
const LoginNoJoinDto = z.object({ auth: z.boolean(), join: z.boolean(), subId: z.string() }).passthrough();
const subscribedTopicV3_Body = z.object({ topic: PushTopicType.default("<string>"), deviceToken: z.string().default("<string>"), deviceType: DeviceTypeDto.default("<string>"), permissionStatus: PermissionStatusTypeDto.default("<string>"), deviceId: z.string().default("<string>") }).passthrough();
const MembershipWaitlist = z.object({ id: z.string().default("<string>"), isDisplay: z.boolean().default("<boolean>"), communityTabImageUrl: z.string().default("<string>"), masterTabImageUrl: z.string().default("<string>"), linkUrl: z.string().default("<string>"), metadata: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const PICK_THUMBNAIL_TYPE = z.enum(["none", "link", "image"]);
const OutBoundLink = z.object({ title: z.string().default("<string>"), sourceName: z.string().default("<string>"), imageUrl: z.string().default("<url>"), originUrl: z.string().default("<url>") }).passthrough();
const SELECTED_PICK_TYPE = z.enum(["sympathy", "suggestion", "expectancy"]);
const PickedCounts = z.object({ count: z.number().int().default(<integer>), type: SELECTED_PICK_TYPE.default("<string>") }).passthrough();
const PickMetadataContent = z.object({ cmsId: z.string().default("<string>"), cmsType: CMS_TYPE.default("<string>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>"), masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<string>"), masterCmsId: z.string().default("<string>"), masterCompanyFullName: z.string().nullish().default("<string>"), masterCompanyShortName: z.string().nullish().default("<string>"), masterCompanyIconUrl: z.string().nullish().default("<string>"), title: z.string().default("<string>"), description: z.string().default("<string>"), pickThumbnailType: PICK_THUMBNAIL_TYPE.default("<string>"), imageUrl: z.string().nullish().default("<string>"), outBoundLink: OutBoundLink.nullish(), commentCount: z.number().int().default(<integer>), pickedCounts: z.array(PickedCounts).min(2).max(2), isNew: z.boolean().default("<boolean>"), isManyComments: z.boolean().default("<boolean>") }).passthrough();
const SECRET_TYPE = z.enum(["article", "video", "audio"]);
const SecretMetadataContent = z.object({ cmsId: z.string().default("<string>"), cmsType: CMS_TYPE.default("<string>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>"), masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<string>"), masterCmsId: z.string().default("<string>"), masterCompanyFullName: z.string().nullish().default("<string>"), masterCompanyShortName: z.string().nullish().default("<string>"), masterCompanyIconUrl: z.string().nullish().default("<string>"), seriesTitle: z.string().default("<string>"), secretRound: z.number().int().default(<integer>), secretTitle: z.string().default("<string>"), thumbnailUrl: z.string().nullish().default("<url>"), seriesCmsId: z.string().default("<string>"), secretType: SECRET_TYPE.default("<string>"), summary: z.string().nullish().default("<string>"), pickedCounts: z.array(PickedCounts).max(2), isNew: z.boolean().default("<boolean>"), commentCount: z.number().int().default(<integer>) }).passthrough();
const SeriesMetadataContent = z.object({ cmsId: z.string(), cmsType: CMS_TYPE.default("<string>"), publishedAt: z.string().datetime({ offset: true }), masterName: z.string(), masterPortraitUrl: z.string(), masterCmsId: z.string(), masterCompanyFullName: z.string().nullish(), masterCompanyShortName: z.string().nullish(), masterCompanyIconUrl: z.string().nullish(), seriesTitle: z.string(), latestSecretTitle: z.string(), latestSecretRound: z.number().int(), latestSecretPublishedAt: z.string().datetime({ offset: true }), latestSecretIsNew: z.boolean(), totalSecretCount: z.number().int(), unReadSecretCount: z.number().int(), seriesImageUrl: z.string() }).passthrough();
const Pagination = z.object({ offset: z.number().int().default(<integer>), limit: z.number().int().default(<integer>), total: z.number().int().default(<integer>) }).passthrough();
const LoungeCommentData = z.object({ commentId: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), comment: z.string().default("<string>"), childCommentCount: z.number().int().default(<integer>), isMasterLike: z.boolean().default("<boolean>"), isMasterComment: z.boolean().default("<boolean>"), userId: z.string().default("<string>"), userNickName: z.string().default("<string>"), userRole: USER_ROLE.default("USER"), userPortraitUrl: z.string().default("<url>"), userPaymentInfos: UserPaymentInfos, contentCmsId: z.string().default("<string>"), contentCmsType: COMMENT_CONTENT_TYPE.default("<string>"), masterName: z.string().nullish().default("<string>"), masterPortraitUrl: z.string().nullish().default("<url>"), isRepliedMasterComment: z.boolean().nullish().default("<boolean>") }).passthrough();
const MasterNoticesData = z.object({ masterNoticeId: z.string().default("<mongo-id>"), masterNoticeCmsId: z.string().default("<string>"), title: z.string().default("<string>"), creator: z.string().default("<string>"), isRead: z.boolean().default("<boolean>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const MostViewedContent = z.object({ cmsId: z.string().default("<string>"), title: z.string().default("<string>"), round: z.number().int().default(<integer>), thumbnailUrl: z.string().default("<url>"), contentViewCount: z.number().int().default(<integer>) }).passthrough();
const PDF = z.object({ pdfUrl: z.string().default("<string>"), fileName: z.string().default("<string>") }).passthrough();
const PickDetailMetaDataContent = z.object({ cmsId: z.string().default("<string>"), cmsType: CMS_TYPE.default("<string>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>"), masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<string>"), masterCmsId: z.string().default("<string>"), masterCompanyFullName: z.string().nullish().default("<string>"), masterCompanyShortName: z.string().nullish().default("<string>"), masterCompanyIconUrl: z.string().nullish().default("<string>"), masterIsCommentBlock: z.boolean().default("<boolean>"), pickedCounts: z.array(PickedCounts).max(2), contentUrl: z.string().default("<url>"), html: z.string().default("<string>"), pdf: z.array(PDF).max(2).nullish(), isPickedType: SELECTED_PICK_TYPE.optional().default("<string>"), isScrapped: z.boolean().default("<boolean>"), bodyJson: z.string().default("<string>"), editorVersion: z.string().default("<string>"), title: z.string().default("<string>"), imageUrl: z.string().nullish().default("<string>"), outBoundLink: z.array(OutBoundLink).max(2).nullish(), masterDetailKeyCareer: z.string().default("<string>") }).passthrough();
const SecretDetailMetadataContent = z.object({ cmsId: z.string().default("<string>"), cmsType: CMS_TYPE.default("<string>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>"), masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<string>"), masterCmsId: z.string().default("<string>"), masterCompanyFullName: z.string().nullish().default("<string>"), masterCompanyShortName: z.string().nullish().default("<string>"), masterCompanyIconUrl: z.string().nullish().default("<string>"), masterIsCommentBlock: z.boolean().default("<boolean>"), pickedCounts: z.array(PickedCounts).max(2), contentUrl: z.string().default("<url>"), html: z.string().default("<string>"), pdf: z.array(PDF).max(2).nullish(), isPickedType: SELECTED_PICK_TYPE.optional().default("<string>"), isScrapped: z.boolean().default("<boolean>"), bodyJson: z.string().default("<string>"), editorVersion: z.string().default("<string>"), secretType: SECRET_TYPE.default("<string>"), secretTitle: z.string().default("<string>"), seriesCmsId: z.string().default("<string>"), secretRound: z.number().int().default(<integer>), totalSecretCount: z.number().int().default(<integer>), previewHtml: z.string().default("<string>"), price: z.number().int().default(<integer>), prevSecretCmsId: z.string().nullish().default("<string>"), prevSecretTitle: z.string().nullish().default("<string>"), nextSecretCmsId: z.string().nullish().default("<string>"), nextSecretTitle: z.string().nullish().default("<string>"), hasAuthority: z.boolean().default("<boolean>"), fontSize: z.number().default(<double>), lineHeight: z.number().default(<double>), membershipIntroduction: MembershipIntroductionDto.nullish(), mediaOriginUrl: z.string().nullish().default("<string>"), mediaConvertUrl: z.string().nullish().default("<string>"), thumbnailUrl: z.string().nullish().default("<string>"), cookie: z.string().nullish().default("<string>") }).passthrough();
const SecretDetailMetadataContentV2 = z.object({ cmsId: z.string().default("<string>"), cmsType: CMS_TYPE.default("<string>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>"), masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<string>"), masterCmsId: z.string().default("<string>"), masterCompanyFullName: z.string().nullish().default("<string>"), masterCompanyShortName: z.string().nullish().default("<string>"), masterCompanyIconUrl: z.string().nullish().default("<string>"), masterIsCommentBlock: z.boolean().default("<boolean>"), pickedCounts: z.array(PickedCounts).max(2), contentUrl: z.string().default("<url>"), html: z.string().default("<string>"), pdf: z.array(PDF).max(2).nullish(), isPickedType: SELECTED_PICK_TYPE.optional().default("<string>"), isScrapped: z.boolean().default("<boolean>"), bodyJson: z.string().default("<string>"), editorVersion: z.string().default("<string>"), secretType: SECRET_TYPE.default("<string>"), secretTitle: z.string().default("<string>"), seriesCmsId: z.string().default("<string>"), secretRound: z.number().int().default(<integer>), totalSecretCount: z.number().int().default(<integer>), price: z.number().int().default(<integer>), prevSecretCmsId: z.string().nullish().default("<string>"), prevSecretTitle: z.string().nullish().default("<string>"), nextSecretCmsId: z.string().nullish().default("<string>"), nextSecretTitle: z.string().nullish().default("<string>"), hasAuthority: z.boolean().default("<boolean>"), fontSize: z.number().default(<double>), lineHeight: z.number().default(<double>), membershipIntroduction: MembershipIntroductionDto.nullish(), mediaConvertUrl: z.string().nullish().default("<string>"), thumbnailUrl: z.string().nullish().default("<string>"), cookie: z.string().nullish().default("<string>"), masterDetailKeyCareer: z.string().default("<string>") }).passthrough();
const ContentAuthorityStatus = z.enum(["membership", "purchased", "none"]);
const SeriesSecretMetadataContent = z.object({ cmsId: z.string().default("<string>"), title: z.string().default("<string>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>"), price: z.number().int().default(<integer>), round: z.number().int().default(<integer>), isRead: z.boolean().default("<boolean>"), isNew: z.boolean().default("<boolean>"), secretType: SECRET_TYPE.default("<string>"), authorityStatus: ContentAuthorityStatus.default("<string>") }).passthrough();
const SeriesDetailMetadataContent = z.object({ secretCount: z.number().int().default(<integer>), isReadCount: z.number().int().default(<integer>), imageUrl: z.string().default("<url>"), masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<string>"), masterCmsId: z.string().default("<string>"), title: z.string().default("<string>"), description: z.string().default("<string>"), isScrapped: z.boolean().default("<boolean>") }).passthrough();
const MY_PRODUCT_TYPE = z.literal("membership");
const MY_PRODUCT_STATUS = z.enum(["active", "inactive"]);
const STATE_ENUM = z.enum(["unknown", "purchased_success", "purchased_fail", "purchased_refund", "subscription_expired", "subscription_cancelled", "subscription_cancel_withdraw", "subscription_changed", "subscription_renewed", "waiting_for_deposit", "paymentmethod_change"]);
const MyProductMetadata = z.object({ myProductId: z.string().default("<string>"), type: MY_PRODUCT_TYPE.default("<string>"), status: MY_PRODUCT_STATUS.default("<string>"), paymentState: STATE_ENUM.default("<string>"), productId: z.string().default("<string>"), productName: z.string().default("<string>"), productDisplayName: z.string().default("<string>"), productDisplayMasterName: z.string().default("<string>"), paymentMethod: z.string().nullish().default("<string>"), paymentMethodProvider: z.string().default("<string>"), paymentMethodInfo: z.string().nullish().default("<string>"), expiredAt: z.string().datetime({ offset: true }).default("<dateTime>"), gracePeriod: z.number().int().default(<integer>), masterCmsId: z.string().default("<string>"), masterName: z.string().default("<string>"), isUnChangeable: z.boolean().default("<boolean>") }).passthrough();
const ContentScheduleMetaData = z.object({ masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<url>"), masterCmsId: z.string().default("<string>"), title: z.string().default("<string>"), scheduledAt: z.string().datetime({ offset: true }).default("<dateTime>"), seriesTitle: z.string().default("<string>"), seriesCmsId: z.string().default("<string>") }).passthrough();
const UserCommentData = z.object({ commentId: z.string().default("<string>"), parentCommentId: z.string().nullish().default("<string>"), userId: z.string().default("<string>"), comment: z.string().default("<string>"), likeCount: z.number().int().default(<integer>), childCommentCount: z.number().int().default(<integer>), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), contentCmsId: z.string().default("<string>"), contentCmsType: COMMENT_CONTENT_TYPE.default("<string>"), title: z.string().nullish().default("<string>"), seriesTitle: z.string().nullish().default("<string>"), isMeLike: z.boolean().default("<boolean>"), isMasterLike: z.boolean().default("<boolean>"), isMasterComment: z.boolean().default("<boolean>"), isRepliedMasterComment: z.boolean().default("<boolean>"), isMeComment: z.boolean().default("<boolean>"), masterName: z.string().nullish().default("<string>"), masterPortraitUrl: z.string().nullish().default("<url>") }).passthrough();
const CommentContentType = z.enum(["pick", "secret", "live", "poll", "unknown"]);
const UserAlarmHistory = z.object({ id: z.string().default("<string>"), notificationType: z.string().default("<string>"), receivedAt: z.string().datetime({ offset: true }).default("<dateTime>"), title: z.string().default("<string>"), body: z.string().default("<string>"), path: z.string().default("<string>"), didRead: z.boolean().default("<boolean>"), link: z.string().nullish().default("<string>"), commentContentType: CommentContentType.optional().default("<string>") }).passthrough();
const ASSET_TYPE = z.enum(["CHARGED", "USED", "REWARD", "AVAILABLE"]);
const MyAssetMetadata = z.object({ type: ASSET_TYPE.default("<string>"), balance: z.number().int().default(<integer>), secretTitle: z.string().nullish().default("<string>"), secretRound: z.number().int().nullish().default(<integer>), secretCmsId: z.string().nullish().default("<string>"), seriesTitle: z.string().nullish().default("<string>"), masterCmsId: z.string().nullish().default("<string>"), masterPortraitUrl: z.string().nullish().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const MyAssetBalanceMetadata = z.object({ type: ASSET_TYPE.default("<string>"), balance: z.number().int().default(<integer>) }).passthrough();
const PurchasedSecretMetaData = z.object({ cmsId: z.string().default("<string>"), cmsType: CMS_TYPE.default("<string>"), publishedAt: z.string().datetime({ offset: true }).default("<dateTime>"), masterName: z.string().default("<string>"), masterPortraitUrl: z.string().default("<string>"), masterCmsId: z.string().default("<string>"), masterCompanyFullName: z.string().nullish().default("<string>"), masterCompanyShortName: z.string().nullish().default("<string>"), masterCompanyIconUrl: z.string().nullish().default("<string>"), seriesTitle: z.string().default("<string>"), secretRound: z.number().int().default(<integer>), secretTitle: z.string().default("<string>"), thumbnailUrl: z.string().nullish().default("<url>"), seriesCmsId: z.string().default("<string>"), secretType: SECRET_TYPE.default("<string>"), summary: z.string().nullish().default("<string>"), pickedCounts: z.array(PickedCounts).max(2), isNew: z.boolean().default("<boolean>"), commentCount: z.number().int().default(<integer>), purchasedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const FollowedMaster = z.object({ cmsId: z.string().default("<string>"), name: z.string().default("<string>"), profileImage: z.string().default("<url>"), id: z.string().default("<string>") }).passthrough();
const NoticeMetadata = z.object({ cmsId: z.string().default("<string>"), title: z.string().default("<string>"), creator: z.string().default("<string>"), createdAt: z.string().default("<string>"), isRead: z.boolean().default("<boolean>") }).passthrough();
const SignPathType = z.enum(["IOS", "ANDROID", "WEB", "UNKNOWN"]);
const signUpByWeb_Body = z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), nickName: z.string().default("<string>"), portraitURL: z.string().default("<url>"), password: z.string().min(8).nullish().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), marketingAgree: z.boolean().default("<boolean>"), signPath: SignPathType.default("<string>") }).passthrough();
const ProviderType = z.enum(["direct", "apple", "google", "naver", "kakao"]);
const AuthPushTopicsResponse = z.object({ name: PushTopicType.default("<string>"), isSubscribed: z.boolean().default("<boolean>"), "_id": z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const AuthWebSignUpUserResponse = z.object({ subId: z.string().default("<string>"), provider: ProviderType.default("<string>"), password: z.string().min(8).nullish().default("<string>"), portraitURL: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), pushTopics: z.array(AuthPushTopicsResponse).min(2).max(2), id: z.string().default("<string>"), signPath: SignPathType.default("<string>") }).passthrough();
const AuthTokenResponse = z.object({ token: z.string().default("<string>"), expires: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const AuthSignUpTokenResponse = z.object({ access: AuthTokenResponse, refresh: AuthTokenResponse }).passthrough();
const signUpByApp_Body = z.object({ subId: z.string().default("<string>"), nickName: z.string().default("<string>"), password: z.string().min(8).nullish().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), deviceType: DeviceTypeDto.default("<string>"), deviceModel: z.string().nullish().default("<string>"), deviceToken: z.string().default("<string>"), isMarketingAgreed: z.boolean().default("<boolean>"), isNightMarketingAgreed: z.boolean().default("<boolean>"), permissionStatus: PermissionStatusTypeDto.default("<string>"), deviceId: z.string().default("<string>"), portraitImage: z.string().default("<binary>") }).passthrough();
const UserRoleName = z.enum(["USER", "ADMIN", "MASTER", "MONITOR", "MASTER_ADMIN", "MASTER_MONITOR"]);
const AuthAppSignUpUserResponse = z.object({ subId: z.string().default("<string>"), provider: ProviderType.default("<string>"), portraitUrl: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), id: z.string().default("<string>"), email: z.string().email().nullish().default("<email>"), currentAsset: z.number().int().default(<integer>), role: UserRoleDto.default("user"), isFinishedTUT: z.boolean().default(false), userRole: UserRoleName.default("USER") }).passthrough();
const MarketingAgreeTypeDto = z.enum(["isMarketingAgreed", "isNightMarketingAgreed", "all"]);
const updateMarketingAgree_Body = z.object({ name: MarketingAgreeTypeDto.default("<string>"), value: z.boolean().default("<boolean>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough();
const generateAuthCode_Body = z.object({ subId: z.string().nullish().default("<string>"), type: AuthCodeTypeV2Dto.default("<string>"), phoneNumber: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>") }).passthrough();
const validatePassword_Body = z.object({ subId: z.string().default("<string>"), password: z.string().min(8).default("<string>") }).passthrough();
const AuthDuplicateUserResponse = z.object({ phoneNumber: z.string().default("<string>"), joinDate: z.string().default("<string>"), nickName: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>") }).passthrough();
const FAQ_TYPE = z.enum(["USER", "SERVICE", "PAYMENT"]);
const FAQData = z.object({ id: z.string().default("<string>"), cmsId: z.string().default("<string>"), type: FAQ_TYPE.default("<string>"), title: z.string().default("<string>"), description: z.string().default("<string>") }).passthrough();

export const schemas = {
	PickCountType,
	ContentTypeDto,
	ScrapTypeDto,
	FollowDto,
	UpdateFollow,
	updateFollow_Body,
	UpdateFollowResponseDto,
	patchProfileEditScreen_Body,
	LoginTypeDto,
	PatchIsReadByMasterNoticeDto,
	patchReadNotice_Body,
	NoticeHistoryDto,
	patchFormattingStyle_Body,
	PatchClubLetterByReadValue,
	PollCardModel,
	FinanceTypeDto,
	FinanceCardModel,
	MembershipTypeDto,
	MasterCardModelV2,
	FeedBannerModel,
	UserTierTypeDto,
	AccessStateDto,
	MasterAccessStateDto,
	MembershipIntroductionType,
	MembershipIntroductionDto,
	CareerData,
	getClubNoticesV2Dto,
	IndexListTileModel,
	USER_ROLE,
	UserPaymentInfos,
	COMMENT_CONTENT_TYPE,
	ContentCommentData,
	CMS_TYPE,
	postCommentV3_Body,
	CommentIdData,
	MasterDetailCareer,
	MASTER_STATUS,
	MasterOpenStatus,
	MembershipIntroduction,
	Master,
	UserLevelTypeDto,
	InterestType,
	MembershipStatusDto,
	TransactionStatus,
	MyMembershipPaymentProviderDto,
	PaymentMethodType,
	MyMembershipCardModelV3,
	MyMembershipCardModel,
	PurchaseSuccessCardModel,
	PurchaseFailCardModel,
	SubscriptionCancelCardModel,
	SubscriptionChangeCardModel,
	SubscriptionCancelWithdrawCardModel,
	HectoMethodType,
	HectoCardGBType,
	HectoCorpPayCodeType,
	membershipProductHectoModel,
	PaymentMethodChangeType,
	MembershipsProduct,
	CancelResultDto,
	RenewResultDto,
	membershipProductHectoChangeProductModel,
	membershipProductHectoChangeModel,
	AssetsProduct,
	postAssetsProducts_Body,
	MyContentType,
	postMyContents_Body,
	MyContentDto,
	GetRedDotResponseDto,
	InterestRankListTileModel,
	ContentCardTypeDto,
	SeriesCardDto,
	TransactionTypeDto,
	SecretTypeDto,
	ContentAuthorityStatusDto,
	SecretBriefCardDtoV3,
	LOGIN_TYPE,
	DeviceTypeDto,
	PermissionStatusTypeDto,
	postDeviceV3_Body,
	PushTopicType,
	PushTopicDto,
	TokenDto,
	ProviderTypeDto,
	validateAuthCode_Body,
	AuthCodeTypeV2Dto,
	sendAuthCodeV2_Body,
	directLoginV2_Body,
	UserRoleDto,
	getMyAuthDto,
	DuplicateUser,
	NaverAuthTokenDto,
	NaverAuthDto,
	naverAuthWithNative_Body,
	LoginSuccessDto,
	LoginNoJoinDto,
	subscribedTopicV3_Body,
	MembershipWaitlist,
	PICK_THUMBNAIL_TYPE,
	OutBoundLink,
	SELECTED_PICK_TYPE,
	PickedCounts,
	PickMetadataContent,
	SECRET_TYPE,
	SecretMetadataContent,
	SeriesMetadataContent,
	Pagination,
	LoungeCommentData,
	MasterNoticesData,
	MostViewedContent,
	PDF,
	PickDetailMetaDataContent,
	SecretDetailMetadataContent,
	SecretDetailMetadataContentV2,
	ContentAuthorityStatus,
	SeriesSecretMetadataContent,
	SeriesDetailMetadataContent,
	MY_PRODUCT_TYPE,
	MY_PRODUCT_STATUS,
	STATE_ENUM,
	MyProductMetadata,
	ContentScheduleMetaData,
	UserCommentData,
	CommentContentType,
	UserAlarmHistory,
	ASSET_TYPE,
	MyAssetMetadata,
	MyAssetBalanceMetadata,
	PurchasedSecretMetaData,
	FollowedMaster,
	NoticeMetadata,
	SignPathType,
	signUpByWeb_Body,
	ProviderType,
	AuthPushTopicsResponse,
	AuthWebSignUpUserResponse,
	AuthTokenResponse,
	AuthSignUpTokenResponse,
	signUpByApp_Body,
	UserRoleName,
	AuthAppSignUpUserResponse,
	MarketingAgreeTypeDto,
	updateMarketingAgree_Body,
	generateAuthCode_Body,
	validatePassword_Body,
	AuthDuplicateUserResponse,
	FAQ_TYPE,
	FAQData,
};

const endpoints = makeApi([
	{
		method: "put",
		path: "/:contentType/:contentId/scrap",
		alias: "updateScrapByContentId",
		description: `ContentId 를 스크랩 또는 언스크랩을 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "contentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentType",
				type: "Path",
				schema: z.enum(["pick", "series", "secret", "live", "all"]).default("<string>")
			},
			{
				name: "isScraped",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
		],
		response: z.object({ content: z.string().default("<string>"), contentType: ScrapTypeDto.default("<string>"), isScraped: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/admin/perchasedUserCount",
		alias: "AdminController_getPerchasedUserCount",
		requestFormat: "json",
		response: z.object({  }).partial().passthrough(),
	},
	{
		method: "get",
		path: "/admin/purchased/economicFreedom",
		alias: "AdminController_getPurchasedEconomicFreedom",
		requestFormat: "json",
		response: z.object({  }).partial().passthrough(),
	},
	{
		method: "get",
		path: "/admin/purchased/safeAsset",
		alias: "AdminController_getPurchasedSafeAsset",
		requestFormat: "json",
		response: z.object({  }).partial().passthrough(),
	},
	{
		method: "get",
		path: "/admin/salesAmount",
		alias: "AdminController_getSalesAmount",
		requestFormat: "json",
		response: z.object({  }).partial().passthrough(),
	},
	{
		method: "get",
		path: "/admin/userJoinCount",
		alias: "AdminController_getUserJoinCount",
		requestFormat: "json",
		response: z.object({  }).partial().passthrough(),
	},
	{
		method: "get",
		path: "/auth/apple",
		alias: "appleAuth",
		description: `애플 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "post",
		path: "/auth/direct/code/generate/v2",
		alias: "sendAuthCodeV2",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: sendAuthCodeV2_Body
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), phoneNumber: z.string().default("<string>"), expires: z.string().datetime({ offset: true }).default("<dateTime>"), id: z.string().default("<string>"), code: z.number().int().default(<integer>) }).passthrough(),
		errors: [
			{
				status: 400,
				description: `Bad request`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/auth/direct/code/validate",
		alias: "validateAuthCode",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: validateAuthCode_Body
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), code: z.number().int().default(<integer>), phoneNumber: z.string().default("<string>"), expires: z.string().datetime({ offset: true }).default("<dateTime>"), id: z.string().default("<string>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Bad Request`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/auth/google",
		alias: "googleAuth",
		description: `구글 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "get",
		path: "/auth/kakao",
		alias: "kakaoAuth",
		description: `카카오 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "get",
		path: "/auth/naver",
		alias: "naverAuth",
		description: `네이버 로그인`,
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 307,
				description: `성공`,
				schema: z.void()
			},
		]
	},
	{
		method: "post",
		path: "/auth/naver/native",
		alias: "naverAuthWithNative",
		description: `네이버 로그인 (Flutter navtive only)`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: naverAuthWithNative_Body
			},
		],
		response: z.object({ data: z.union([LoginSuccessDto, LoginNoJoinDto]) }).partial().passthrough(),
	},
	{
		method: "post",
		path: "/auth/refreshtokens",
		alias: "refreshTokens",
		description: `refresh token 을 이용해서 refresh token 과 access token 을 재발급합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ refreshToken: z.string().default("<string>") }).passthrough()
			},
		],
		response: z.object({ access: TokenDto, refresh: TokenDto }).passthrough(),
		errors: [
			{
				status: 404,
				description: `Not found`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "delete",
		path: "/auth/signOut/V2",
		alias: "signOutV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.void(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/auth/validate",
		alias: "validateAccessToken",
		description: `access token 에 대한 유효성을 검증합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), password: z.string().min(8).nullish().default("<string>"), portraitURL: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), pushTopics: z.array(PushTopicDto).max(2), id: z.string().default("<string>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "patch",
		path: "/clubLetter/:masterId",
		alias: "patchClubLetterByReadValue",
		requestFormat: "json",
		parameters: [
			{
				name: "masterId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ clubLetterHistory: z.array(PatchClubLetterByReadValue).max(2) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/clubs/:id/master",
		alias: "getClubScreenDetailById",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ name: z.string().default("<string>"), masterDetailIntroduction: z.string().default("<string>"), masterDetailKeyCareer: z.string().default("<string>"), description: z.string().default("<string>"), cumulativeDonation: z.string().default("<string>"), masterDetailCareers: z.array(CareerData).max(2) }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/clubs/notice/:noticeId",
		alias: "getClubNoticeById",
		requestFormat: "json",
		parameters: [
			{
				name: "noticeId",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ id: z.string().default("<string>"), title: z.string().default("<string>"), description: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), creator: z.string().default("<string>") }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/comments/:commentId/child-comments",
		alias: "getChildCommentsByParentCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(ContentCommentData).max(2) }).passthrough(),
	},
	{
		method: "patch",
		path: "/comments/:commentId/likes",
		alias: "upsertLikeByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ isLike: z.boolean().default("<boolean>") }).passthrough()
			},
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).passthrough(),
		errors: [
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/comments/:commentId/masters",
		alias: "getMasterByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ master: Master }).passthrough(),
	},
	{
		method: "post",
		path: "/comments/:commentId/reports",
		alias: "createReportByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).passthrough(),
		errors: [
			{
				status: 403,
				description: `Forbidden`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 409,
				description: `Conflict`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/content-schedules",
		alias: "getContentSchedules",
		description: `컨텐츠 일정들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "startAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "endAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
		],
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/content-schedules/target-date",
		alias: "getContentSchedulesTargetDate",
		description: `컨텐츠 일정들을 가져옵니다. 현재 시간 바로 이전, 바로 이후 컨텐츠를 하나씩 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "targetDate",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents",
		alias: "getContents",
		description: `컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).min(2).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/:contentCmsId/comments",
		alias: "getCommentsByContent",
		description: `컨텐츠의 댓글들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentCmsType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
			{
				name: "order",
				type: "Query",
				schema: z.enum(["latest", "like"]).default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(ContentCommentData).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/:contentCmsId/comments/count",
		alias: "getCommentCountByContent",
		description: `컨텐츠의 댓글의 총 갯수를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentCmsType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
		],
		response: z.object({ commentCount: z.number().int().default(<integer>) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/:contentCmsId/masters",
		alias: "getMasterByContentCmsId",
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ master: Master }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/free-recommendation",
		alias: "getFreeRecommendationContent",
		description: `isDisplayFreeRecommendation가 true인 멤버십 컨텐츠를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(SecretMetadataContent).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/join-recommendation",
		alias: "getJoinRecommendationContents",
		description: `isShownJoinRecommendation이 true인 커뮤니티 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(PickMetadataContent).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/most-viewed",
		alias: "getMostViewedContents",
		description: `시작날짜와 종료날짜를 기준으로 조회수가 높은 멤버십 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "startAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "endAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(MostViewedContent).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/pick/:cmsId",
		alias: "getPickContentByCmsId",
		description: `아이디에 해당하는 커뮤니티 컨텐츠를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "cmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: PickDetailMetaDataContent }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/picked",
		alias: "getPickedContents",
		description: `함께픽하기의 일정 갯수 이상인 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(PickMetadataContent).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/secret/:cmsId",
		alias: "getSecretContentByCmsId",
		description: `아이디에 해당하는 커뮤니티 컨텐츠들을 가져옵니다. APP 전용`,
		requestFormat: "json",
		parameters: [
			{
				name: "cmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: SecretDetailMetadataContent }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/series/:seriesCmsId",
		alias: "getSeriesByCmsId",
		description: `아이디에 해당하는 시리즈를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "seriesCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: SeriesDetailMetadataContent }).passthrough(),
	},
	{
		method: "get",
		path: "/contents/series/:seriesCmsId/secrets",
		alias: "getSecretContentsBySeriesCmsId",
		description: `시리즈의 시크릿 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "seriesCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "order",
				type: "Query",
				schema: z.enum(["ROUND", "LATEST"]).default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(SeriesSecretMetadataContent).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/faqs",
		alias: "getFaqs",
		description: `FAQ들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "type",
				type: "Query",
				schema: z.enum(["USER", "SERVICE", "PAYMENT"]).optional().default("<string>")
			},
		],
		response: z.object({ faqs: z.array(FAQData).max(2) }).passthrough(),
	},
	{
		method: "patch",
		path: "/formattingStyle",
		alias: "patchFormattingStyle",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchFormattingStyle_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ fontSize: z.number().default(<double>), lineHeight: z.number().default(<double>) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/helpDesk/notices/:id",
		alias: "getNoticeScreenById",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ title: z.string().default("<string>"), desc: z.string().default("<string>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), creator: z.string().default("<string>") }).passthrough(),
	},
	{
		method: "get",
		path: "/indexes",
		alias: "getIndexesScreen",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ indexes: z.array(IndexListTileModel).max(2) }).passthrough(),
	},
	{
		method: "patch",
		path: "/masterNotice/:noticeId",
		alias: "patchIsReadByMasterNotice",
		requestFormat: "json",
		parameters: [
			{
				name: "noticeId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "masterId",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masterNoticeHistory: z.array(PatchIsReadByMasterNoticeDto).max(2) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/masters",
		alias: "getMasters",
		requestFormat: "json",
		parameters: [
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "type",
				type: "Query",
				schema: z.literal("RECOMMEND").optional().default("<string>")
			},
		],
		response: z.object({ masters: z.array(Master).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId",
		alias: "getMasterByMasterCmsId",
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
			},
		],
		response: z.object({ master: Master }).passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId/comments",
		alias: "getCommentsByMasterCmsId",
		description: `마스터 컨텐츠의 댓글들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(LoungeCommentData).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId/contents",
		alias: "getContentsByMasterId",
		description: `마스터의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).min(2).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/masters/:masterCmsId/master-notices",
		alias: "getMasterNoticesByMasterCmsId",
		description: `마스터의 공지사항들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
		],
		response: z.object({ masterNotices: z.array(MasterNoticesData).max(2), pagination: Pagination }).passthrough(),
	},
	{
		method: "put",
		path: "/masters/:masterId/follows",
		alias: "updateFollowByMasterId",
		description: `MasterId 를 팔로우 또는 언팔로우를 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isFollowed",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ followed: z.string().default("<string>"), isFollowed: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "put",
		path: "/masters/follows",
		alias: "updateFollow",
		description: `MyMaster에서 팔로우를 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: updateFollow_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ follows: z.array(UpdateFollowResponseDto).max(2) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/me/contents",
		alias: "postMyContents",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postMyContents_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: MyContentDto }).passthrough(),
	},
	{
		method: "get",
		path: "/me/follows_brief",
		alias: "getMyFollows",
		description: `내가 팔로우 한 목록을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.array(FollowDto).max(2),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId",
		alias: "getMyMembershipDetailScreen",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ membership: MyMembershipCardModel, transcations: z.array(z.union([PurchaseSuccessCardModel, PurchaseFailCardModel, SubscriptionCancelCardModel, SubscriptionChangeCardModel, SubscriptionCancelWithdrawCardModel])).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId/cancel",
		alias: "getMyMembershipCancelScreen",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ product: MembershipsProduct, expiredAt: z.string().default("<string>") }).passthrough(),
	},
	{
		method: "post",
		path: "/me/memberships/:membershipId/cancel",
		alias: "postMyMembershipCancel",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ expiredAt: z.string().default("<string>"), result: CancelResultDto.default("<string>") }).passthrough(),
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId/change",
		alias: "getMyMembershipChange",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ memberships: z.array(membershipProductHectoChangeModel).max(2) }).passthrough(),
	},
	{
		method: "post",
		path: "/me/memberships/:membershipId/change",
		alias: "postMyMembershipChange",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ productId: z.string().default("<string>") }).passthrough()
			},
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ changedExpiredAt: z.string().default("<string>"), result: RenewResultDto.default("<string>") }).passthrough(),
	},
	{
		method: "get",
		path: "/me/memberships/:membershipId/paymentMethodChange",
		alias: "getMyMembershipPaymentMethodChange",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "method",
				type: "Query",
				schema: z.enum(["card", "corp", "unknown"]).default("<string>")
			},
		],
		response: z.object({ mchtId: z.string().default("<string>"), method: HectoMethodType.default("<string>"), cardGb: HectoCardGBType.optional().default("<string>"), corpPayCode: HectoCorpPayCodeType.optional().default("<string>"), mchtName: z.string().default("<string>"), mchtEName: z.string().default("<string>"), notiUrl: z.string().default("<string>"), nextUrl: z.string().default("<string>"), cancUrl: z.string().default("<string>"), trdDt: z.string().default("<string>"), trdTm: z.string().default("<string>"), pktHash: z.string().default("<string>"), product: membershipProductHectoModel, paymentMethodChangeType: PaymentMethodChangeType.default("<string>") }).passthrough(),
	},
	{
		method: "post",
		path: "/me/memberships/:membershipId/renew",
		alias: "postMyMembershipRenew",
		requestFormat: "json",
		parameters: [
			{
				name: "membershipId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ expiredAt: z.string().default("<string>"), result: RenewResultDto.default("<string>") }).passthrough(),
	},
	{
		method: "post",
		path: "/me/products/assets",
		alias: "postAssetsProducts",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postAssetsProducts_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ transcationToken: z.string().default("<string>"), transcationState: TransactionStatus.default("<string>"), product: AssetsProduct }).passthrough(),
	},
	{
		method: "get",
		path: "/me/profile_edit",
		alias: "getProfileEditScreen",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ portraitUrl: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), LoginTypeDto: LoginTypeDto.default("<string>"), addPhoneNumber: z.boolean().default("<boolean>") }).passthrough(),
	},
	{
		method: "get",
		path: "/me/redDot",
		alias: "getRedDot",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ data: GetRedDotResponseDto }).passthrough(),
	},
	{
		method: "get",
		path: "/membership-waitlists",
		alias: "getMembershipWaitlist",
		requestFormat: "json",
		parameters: [
			{
				name: "isDisplay",
				type: "Query",
				schema: z.boolean().optional().default("<boolean>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ membershipWaitlists: z.array(MembershipWaitlist).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/notices",
		alias: "getNotices",
		description: `공지사항을 조회합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
		],
		response: z.object({ notices: z.array(NoticeMetadata).max(2) }).passthrough(),
	},
	{
		method: "patch",
		path: "/notices/read",
		alias: "patchReadNotice",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchReadNotice_Body
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ noticeHistory: z.array(NoticeHistoryDto).max(2) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/products/assets/android",
		alias: "getAssetProductsAndroid",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ products: z.array(AssetsProduct).min(2).max(2) }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/products/assets/ios",
		alias: "getAssetProductsIos",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ products: z.array(AssetsProduct).min(2).max(2) }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/products/memberships/android",
		alias: "getMembershipProductsAndroid",
		requestFormat: "json",
		parameters: [
			{
				name: "masterId",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masterId: z.string().default("<string>"), groupId: z.string().default("<string>"), groupName: z.string().default("<string>"), products: z.array(MembershipsProduct).min(2).max(2) }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/products/memberships/hecto",
		alias: "getMembershipProductsHecto",
		description: `헥토 멤버십 상품 리스트 조회`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "masterId",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "productGroupId",
				type: "Query",
				schema: z.string().default("<string>")
			},
		],
		response: z.object({ masterId: z.string().default("<string>"), mchtId: z.string().default("<string>"), mchtName: z.string().default("<string>"), mchtEName: z.string().default("<string>"), products: z.array(membershipProductHectoModel).min(2).max(2).optional() }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/products/memberships/hecto/:mchtTrdNo",
		alias: "getMembershipProductDetailHecto",
		description: `헥토 멤버십 상품 상세 조회, 호출 시점에 결제 방식이 결정되어 있어야 함`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "mchtTrdNo",
				type: "Path",
				schema: z.string()
			},
			{
				name: "method",
				type: "Query",
				schema: z.enum(["card", "corp", "unknown"]).default("<string>")
			},
			{
				name: "cardGb",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "corpPayCode",
				type: "Query",
				schema: z.string().default("<string>")
			},
		],
		response: z.object({ mchtId: z.string().default("<string>"), method: HectoMethodType.default("<string>"), cardGb: HectoCardGBType.optional().default("<string>"), corpPayCode: HectoCorpPayCodeType.optional().default("<string>"), mchtName: z.string().default("<string>"), mchtEName: z.string().default("<string>"), notiUrl: z.string().default("<string>"), nextUrl: z.string().default("<string>"), cancUrl: z.string().default("<string>"), trdDt: z.string().default("<string>"), trdTm: z.string().default("<string>"), pktHash: z.string().default("<string>"), product: membershipProductHectoModel }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/products/memberships/hecto/no-auth",
		alias: "getMembershipProductsHectoNoAuth",
		description: `헥토 멤버십 상품 리스트 조회 + 개인화된 데이터 제외`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterId",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "productGroupId",
				type: "Query",
				schema: z.string().default("<string>")
			},
		],
		response: z.object({ masterId: z.string().default("<string>"), mchtId: z.string().default("<string>"), mchtName: z.string().default("<string>"), mchtEName: z.string().default("<string>"), products: z.array(membershipProductHectoModel).min(2).max(2).optional() }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "patch",
		path: "/profile_edit",
		alias: "patchProfileEditScreen",
		requestFormat: "form-data",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: patchProfileEditScreen_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ portraitUrl: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), LoginTypeDto: LoginTypeDto.default("<string>"), addPhoneNumber: z.boolean().default("<boolean>") }).passthrough(),
	},
	{
		method: "get",
		path: "/ranks/interest",
		alias: "getInterestRankDialogModel",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ ranks: z.array(InterestRankListTileModel).max(2) }).passthrough(),
	},
	{
		method: "patch",
		path: "/tutorials",
		alias: "patchIsReadTUT",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ isFinishedTUT: z.boolean().default("<boolean>") }).passthrough()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ isFinishedTUT: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/users/:userId/alarm-history",
		alias: "getAlarmHistoryByUserId",
		description: `유저의 알림내역을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "filter",
				type: "Query",
				schema: z.enum(["UNREAD", "ALL"]).default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ alarmHistory: z.array(UserAlarmHistory).max(2) }).passthrough(),
	},
	{
		method: "patch",
		path: "/users/:userId/alarm-history/:alarmHistoryId/read",
		alias: "patchAlarmHistoryIsReadByAlarmHistoryId",
		description: `유저의 알림내역을 읽음처리합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "alarmHistoryId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.void(),
	},
	{
		method: "patch",
		path: "/users/:userId/alarm-history/read",
		alias: "patchAlarmHistoryReadByUserId",
		description: `유저의 알림내역을 모두 읽음처리합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.void(),
	},
	{
		method: "get",
		path: "/users/:userId/comments",
		alias: "getCommentsByUserId",
		description: `유저가 작성한 댓글을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(UserCommentData).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/follows/content-schedules",
		alias: "getContentSchedulesByFollows",
		description: `팔로우 한 마스터들의 컨텐츠 일정들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "startAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "endAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/follows/contents",
		alias: "getContentsByFollows",
		description: `유저가 팔로우 한 마스터들의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).min(2).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/follows/masters",
		alias: "getFollowedMasterByUserId",
		description: `유저가 팔로우 한 마스터들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masters: z.array(FollowedMaster).max(2), pagination: Pagination }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/my-assets",
		alias: "getMyAssetsByUserId",
		description: `유저의 에셋정보를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["CHARGED", "USED", "REWARD", "AVAILABLE"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ myAssets: z.array(MyAssetMetadata).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/my-assets/balance",
		alias: "getMyAssetsBalanceByUserId",
		description: `유저의 에셋의 타입에 따른 총 양를 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["CHARGED", "USED", "REWARD", "AVAILABLE"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ balances: z.array(MyAssetBalanceMetadata).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/my-products",
		alias: "getMyProductsByUserId",
		description: `유저의 멤버십을 가져옵니다. - 배너 전용`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "status",
				type: "Query",
				schema: z.enum(["active", "inactive"]).optional().default("<string>")
			},
			{
				name: "filter",
				type: "Query",
				schema: z.literal("BANNER").optional().default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ myProduct: z.array(MyProductMetadata).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/my-products/content-schedules",
		alias: "getContentSchedulesByMyProducts",
		description: `나의 상품의 마스터의 컨텐츠 일정들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "startAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "endAt",
				type: "Query",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contentSchedules: z.array(ContentScheduleMetaData).min(2).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/purchased-contents",
		alias: "getPurchasedContentsByUserId",
		description: `유저가 구매한 컨텐츠 목록을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(PurchasedSecretMetaData).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/users/:userId/scraps/contents",
		alias: "getScrappedContentsByUserId",
		description: `유저가 스크랩 한 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent, SeriesMetadataContent])).max(2) }).passthrough(),
	},
	{
		method: "post",
		path: "/v1/auth/device",
		alias: "registerDevice",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postDeviceV3_Body
			},
		],
		response: z.object({ pushTopics: z.array(AuthPushTopicsResponse).max(2), deleted: z.boolean().nullish().default("<boolean>"), deviceModel: z.string().default("<string>"), userId: z.string().default("<string>"), country: z.string().default("<string>"), language: z.string().default("<string>"), timezone: z.number().int().default(<integer>), deviceType: DeviceTypeDto.default("<string>"), deviceToken: z.string().default("<string>"), id: z.string().default("<string>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/direct/code/generate",
		alias: "generateAuthCode",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: generateAuthCode_Body
			},
		],
		response: z.void(),
		errors: [
			{
				status: 400,
				description: `Bad request`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/direct/code/validate",
		alias: "checkAuthCode",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: validateAuthCode_Body
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), code: z.number().int().default(<integer>), phoneNumber: z.string().default("<string>"), expires: z.string().datetime({ offset: true }).default("<dateTime>"), id: z.string().default("<string>") }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v1/auth/direct/password/check",
		alias: "validatePassword",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: validatePassword_Body
			},
		],
		response: z.void(),
		errors: [
			{
				status: 400,
				description: `New password is same as old password`,
				schema: z.object({ code: z.number().default(400), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/direct/password/reset",
		alias: "updatePassword",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: validatePassword_Body
			},
		],
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderType.default("<string>"), password: z.string().min(8).nullish().default("<string>"), portraitURL: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), pushTopics: z.array(AuthPushTopicsResponse).max(2), id: z.string().default("<string>") }).passthrough(),
		errors: [
			{
				status: 400,
				description: `New password is same as old password`,
				schema: z.object({ code: z.number().default(400), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/direct/phone-number/check-duplication",
		alias: "checkDuplicatePhoneNumber",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ phoneNumber: z.string().default("<string>") }).passthrough()
			},
		],
		response: z.object({ isDuplicate: z.boolean().default("<boolean>"), users: z.array(AuthDuplicateUserResponse).max(2).nullish() }).passthrough(),
	},
	{
		method: "post",
		path: "/v1/auth/login/direct",
		alias: "directToLogin",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: directLoginV2_Body
			},
		],
		response: z.object({ user: AuthAppSignUpUserResponse, auth: z.boolean().default("<boolean>"), join: z.boolean().default("<boolean>"), subId: z.string().default("<string>"), accessToken: z.string().default("<string>"), accessExpires: z.string().datetime({ offset: true }).default("<dateTime>"), refreshToken: z.string().default("<string>"), refreshExpires: z.string().datetime({ offset: true }).default("<dateTime>"), shouldRecommendation: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 400,
				description: `존재하지 않은 유저입니다.`,
				schema: z.object({ code: z.number().default(400), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 401,
				description: `비밀번호가 일치하지 않습니다.`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "patch",
		path: "/v1/auth/marketingAgree",
		alias: "updateMarketingAgree",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: updateMarketingAgree_Body
			},
		],
		response: z.object({ name: MarketingAgreeTypeDto.default("<string>"), value: z.boolean().default("<boolean>"), createdAt: z.string().datetime({ offset: true }).default("<dateTime>"), updatedAt: z.string().datetime({ offset: true }).default("<dateTime>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v1/auth/me",
		alias: "getMyInfo",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ provider: LOGIN_TYPE.default("<string>"), subId: z.string().default("<string>"), id: z.string().default("<string>"), nickName: z.string().default("<string>"), portraitUrl: z.string().default("<url>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), currentAsset: z.number().int().default(<integer>), role: USER_ROLE.default("USER"), isFinishedTUT: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/phone-numbers/check-duplication",
		alias: "phoneNumberCheckDuplication",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ phoneNumber: z.string().default("<string>") }).passthrough()
			},
		],
		response: z.object({ isDuplicate: z.boolean().default("<boolean>"), users: z.array(DuplicateUser).max(2).nullish() }).passthrough(),
	},
	{
		method: "post",
		path: "/v1/auth/signUp/app",
		alias: "signUpByApp",
		requestFormat: "form-data",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: signUpByApp_Body
			},
			{
				name: "provider",
				type: "Query",
				schema: z.enum(["direct", "apple", "google", "naver", "kakao"]).default("<string>")
			},
			{
				name: "signPath",
				type: "Query",
				schema: z.enum(["IOS", "ANDROID", "WEB", "UNKNOWN"]).default("<string>")
			},
		],
		response: z.object({ user: AuthAppSignUpUserResponse, tokens: AuthSignUpTokenResponse, shouldRecommendation: z.boolean().default("<boolean>"), password: z.string().nullish().default("<string>"), pushTopics: z.array(AuthPushTopicsResponse).max(2) }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/signUp/web",
		alias: "signUpByWeb",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: signUpByWeb_Body
			},
		],
		response: z.object({ user: AuthWebSignUpUserResponse, tokens: AuthSignUpTokenResponse, shouldRecommendation: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v1/auth/token/refresh",
		alias: "refreshToken",
		description: `refresh token 을 이용해서 refresh token 과 access token 을 재발급합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ refreshToken: z.string().default("<string>") }).passthrough()
			},
		],
		response: z.object({ access: AuthTokenResponse, refresh: AuthTokenResponse }).passthrough(),
		errors: [
			{
				status: 404,
				description: `Not found`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v1/auth/validate",
		alias: "validateToken",
		description: `token 에 대한 유효성을 검증합니다.`,
		requestFormat: "json",
		response: z.object({ subId: z.string().default("<string>"), provider: ProviderTypeDto.default("<string>"), password: z.string().min(8).nullish().default("<string>"), portraitURL: z.string().default("<url>"), nickName: z.string().default("<string>"), phoneNumber: z.string().nullish().default("<string>"), pushTopics: z.array(AuthPushTopicsResponse).max(2), id: z.string().default("<string>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "delete",
		path: "/v1/auth/withdraw",
		alias: "withdraw",
		requestFormat: "json",
		response: z.void(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({ code: z.number().default(401), message: z.string().default("<string>") }).passthrough()
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v2/admin/salesAmount",
		alias: "AdminController_getSalesAmountV2",
		requestFormat: "json",
		response: z.object({  }).partial().passthrough(),
	},
	{
		method: "get",
		path: "/v2/admin/userJoinCount",
		alias: "AdminController_getUserJoinCountV2",
		requestFormat: "json",
		response: z.object({  }).partial().passthrough(),
	},
	{
		method: "post",
		path: "/v2/auth/direct",
		alias: "directLoginV2",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: directLoginV2_Body
			},
		],
		response: z.object({ auth: z.boolean().default("<boolean>"), join: z.boolean().default("<boolean>"), subId: z.string().default("<string>"), accessToken: z.string().default("<string>"), accessExpires: z.string().datetime({ offset: true }).default("<dateTime>"), refreshToken: z.string().default("<string>"), refreshExpires: z.string().datetime({ offset: true }).default("<dateTime>"), shouldRecommendation: z.boolean().default("<boolean>"), user: getMyAuthDto }).passthrough(),
		errors: [
			{
				status: 401,
				description: `비밀번호가 틀린 경우`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v2/auth/me",
		alias: "getMyAuthV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ provider: LOGIN_TYPE.default("<string>"), subId: z.string().default("<string>"), id: z.string().default("<string>"), nickName: z.string().default("<string>"), portraitUrl: z.string().default("<url>"), phoneNumber: z.string().nullish().default("<string>"), email: z.string().email().nullish().default("<email>"), currentAsset: z.number().int().default(<integer>), role: USER_ROLE.default("USER"), isFinishedTUT: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v2/clubs/:id/notice",
		alias: "getClubNoticesV2",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ notices: z.array(getClubNoticesV2Dto).max(2) }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "delete",
		path: "/v2/comments/:commentId",
		alias: "deleteCommentByCommentIdV2",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.void(),
		errors: [
			{
				status: 403,
				description: `Forbidden`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v2/contents",
		alias: "getContentsV2",
		description: `컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).max(2), pagination: Pagination }).passthrough(),
	},
	{
		method: "get",
		path: "/v2/contents/:contentCmsId/comments",
		alias: "getCommentsByContentV2",
		description: `컨텐츠의 댓글들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "contentCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "contentCmsType",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).default("<string>")
			},
			{
				name: "order",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comments: z.array(ContentCommentData).max(2), pagination: Pagination }).passthrough(),
	},
	{
		method: "get",
		path: "/v2/contents/secret/:cmsId",
		alias: "getSecretContentByCmsIdV2",
		description: `아이디에 해당하는 커뮤니티 컨텐츠들을 가져옵니다. WEB 전용`,
		requestFormat: "json",
		parameters: [
			{
				name: "cmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ content: SecretDetailMetadataContentV2 }).passthrough(),
	},
	{
		method: "get",
		path: "/v2/helpDesk",
		alias: "getHelpDeskScreenV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ noticeCount: z.number().int().default(<integer>), kakaoOpenChat: z.string().default("<string>") }).passthrough(),
	},
	{
		method: "get",
		path: "/v2/masters/:masterCmsId/contents",
		alias: "getContentsByMasterIdV2",
		description: `마스터의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "masterCmsId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent, SeriesMetadataContent])).max(2), pagination: Pagination }).passthrough(),
	},
	{
		method: "get",
		path: "/v2/me/masters",
		alias: "getMyMastersScreenV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masters: z.array(MasterCardModelV2).max(2) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v2/me/settings",
		alias: "getSettingsScreenV2",
		requestFormat: "json",
		parameters: [
			{
				name: "deviceToken",
				type: "Query",
				schema: z.string().default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ loginType: LoginTypeDto.default("<string>"), userId: z.string().default("<string>"), didEventNotificationAgree: z.boolean().default(false), didMasterNotificationAgree: z.boolean().default(false) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "patch",
		path: "/v2/picks/:pickId/like",
		alias: "updateMyPickByPickIdV2",
		description: `내가 PickId 를 픽 또는 언픽을 합니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "pickId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "isPicked",
				type: "Query",
				schema: z.boolean().default("<boolean>")
			},
			{
				name: "selectedPickType",
				type: "Query",
				schema: z.enum(["sympathy", "suggestion", "expectancy"]).default("<string>")
			},
			{
				name: "contentType",
				type: "Query",
				schema: z.enum(["none", "pick", "series", "secret", "live", "poll", "all"]).default("<string>")
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ pickId: z.string().default("<string>"), isPicked: z.boolean().default("<boolean>"), selectedPickType: PickCountType.optional().default("<string>"), contentType: ContentTypeDto.default("<string>") }).passthrough(),
	},
	{
		method: "get",
		path: "/v2/products/memberships/ios",
		alias: "getMembershipProductsIosV2",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masterId: z.string().default("<string>"), groupId: z.string().default("<string>"), groupName: z.string().default("<string>"), products: z.array(MembershipsProduct).min(2).max(2) }).passthrough(),
		errors: [
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v2/users/:userId/follows/contents",
		alias: "getContentsByFollowsV2",
		description: `유저가 팔로우 한 마스터들의 컨텐츠들을 가져옵니다.`,
		requestFormat: "json",
		parameters: [
			{
				name: "userId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "secret", "series"]).optional().default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ contents: z.array(z.union([PickMetadataContent, SecretMetadataContent])).max(2), pagination: Pagination }).passthrough(),
	},
	{
		method: "post",
		path: "/v3/auth/devices",
		alias: "postDeviceV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postDeviceV3_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ userId: z.string().default("<string>"), country: z.string().default("<string>"), language: z.string().default("<string>"), timezone: z.number().int().default(<integer>), deviceType: DeviceTypeDto.default("<string>"), deviceToken: z.string().default("<string>"), id: z.string().default("<string>"), deviceModel: z.string().default("<string>"), pushTopics: z.array(PushTopicDto).max(2), deleted: z.boolean().nullish().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v3/clubs/club_meta/:id",
		alias: "getClubMetaPageV3",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
			{
				name: "type",
				type: "Query",
				schema: z.enum(["pick", "series", "live", "secret", "all"]).optional().default("<string>")
			},
		],
		response: z.object({ name: z.string().default("<string>"), followers: z.number().int().default(<integer>), clubOfficialImage: z.string().default("<url>"), clubTextImage: z.string().default("<url>"), clubLetter: z.string().nullable().default("<string>"), userTierType: UserTierTypeDto.default("<string>"), accessState: MasterAccessStateDto, secretCount: z.number().int().default(<integer>), seriesCount: z.number().int().default(<integer>), didReadLetter: z.boolean().default("<boolean>"), hasNew: z.boolean().default("<boolean>"), membershipIntroduction: MembershipIntroductionDto.optional() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "post",
		path: "/v3/comments",
		alias: "postCommentV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: postCommentV3_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).passthrough(),
		errors: [
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "patch",
		path: "/v3/comments/:commentId",
		alias: "updateCommentByCommentIdV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: z.object({ value: z.string().default("<string>") }).passthrough()
			},
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: CommentIdData }).passthrough(),
		errors: [
			{
				status: 403,
				description: `Forbidden`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 404,
				description: `Not Found`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v3/me",
		alias: "getMeScreenV3",
		description: `3.0부터 사용`,
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ name: z.string().default("<string>"), portraitUrl: z.string().default("<url>"), usGauge: UserLevelTypeDto.default("<string>"), followingCount: z.number().int().default(<integer>), assetCount: z.number().int().default(<integer>), readContentCount: z.number().int().default(<integer>), checkPoints: z.array(z.number().int().default(<integer>)).max(2), achievementRate: z.number().default(<double>), interestType: InterestType.default("<string>"), membershipCount: z.number().int().default(<integer>), scrapCount: z.number().int().default(<integer>), commentCount: z.number().int().default(<integer>), purchasedContentCount: z.number().int().default(<integer>), unreadHelpdeskCount: z.number().int().default(<integer>), unreadNotificationCount: z.number().int().default(<integer>) }).passthrough(),
	},
	{
		method: "put",
		path: "/v3/push/subscribe",
		alias: "subscribedTopicV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: subscribedTopicV3_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ didEventNotificationAgree: z.boolean().default(false), didMasterNotificationAgree: z.boolean().default(false) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "put",
		path: "/v3/push/unsubscribe",
		alias: "unsubscribedTopicV3",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				type: "Body",
				schema: subscribedTopicV3_Body
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ didEventNotificationAgree: z.boolean().default(false), didMasterNotificationAgree: z.boolean().default(false) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v4/comments/:commentId",
		alias: "getCommentsByCommentId",
		requestFormat: "json",
		parameters: [
			{
				name: "commentId",
				type: "Path",
				schema: z.string()
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ comment: ContentCommentData }).passthrough(),
	},
	{
		method: "get",
		path: "/v4/feed_meta",
		alias: "getFeedMetaPageV4",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ masters: z.array(MasterCardModelV2).min(2).max(2), banners: z.array(FeedBannerModel).min(2).max(2), hasNew: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v4/me/memberships",
		alias: "getMyMembershipScreenV4",
		requestFormat: "json",
		parameters: [
			{
				name: "status",
				type: "Query",
				schema: z.enum(["active", "inactive"]).default("<string>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().optional().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ memberships: z.array(MyMembershipCardModelV3).max(2) }).passthrough(),
	},
	{
		method: "get",
		path: "/v4/picks/meta",
		alias: "getPicksMetaPageV4",
		requestFormat: "json",
		parameters: [
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ poll: PollCardModel, stocks: z.array(FinanceCardModel).max(2), hasNew: z.boolean().default("<boolean>") }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
	{
		method: "get",
		path: "/v4/series/:id",
		alias: "getSeriesScreenByIdV4",
		requestFormat: "json",
		parameters: [
			{
				name: "id",
				type: "Path",
				schema: z.string()
			},
			{
				name: "order",
				type: "Query",
				schema: z.enum(["episode", "latest"]).optional().default("<string>")
			},
			{
				name: "isRead",
				type: "Query",
				schema: z.boolean().optional().default("<boolean>")
			},
			{
				name: "offset",
				type: "Query",
				schema: z.number().default(<number>)
			},
			{
				name: "limit",
				type: "Query",
				schema: z.number().default(<number>)
			},
			{
				name: "authorization",
				type: "Header",
				schema: z.string().optional().default("<string>")
			},
		],
		response: z.object({ coverImageUrl: z.string().default("<url>"), portraitUrl: z.string().default("<url>"), name: z.string().default("<string>"), creatorClubId: z.string().default("<string>"), rateCount: z.number().int().nullish().default(<integer>), title: z.string().default("<string>"), desc: z.string().default("<string>"), tierType: UserTierTypeDto.optional().default("<string>"), recommendationSeries: z.array(SeriesCardDto).max(2).nullish(), isScraped: z.boolean().default("<boolean>"), hasUnReadCount: z.number().int().default(<integer>), totalCount: z.number().int().default(<integer>), secrets: z.array(SecretBriefCardDtoV3).max(2) }).passthrough(),
		errors: [
			{
				status: 401,
				description: `Unauthorized`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
			{
				status: 500,
				description: `Internal server error`,
				schema: z.object({}).partial().passthrough().default("<object>")
			},
		]
	},
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
