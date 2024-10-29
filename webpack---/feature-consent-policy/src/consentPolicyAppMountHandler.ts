import { withDependencies, named } from '@wix/thunderbolt-ioc'
import {
	SiteFeatureConfigSymbol,
	FeatureExportsSymbol,
	IAppWillMountHandler,
	ConsentPolicySymbol,
} from '@wix/thunderbolt-symbols'
import type { IConsentPolicy, ConsentPolicySiteConfig } from './types'
import { name } from './symbols'
import { IFeatureExportsStore } from 'thunderbolt-feature-exports'
import type { ConsentPolicyKey } from '@wix/cookie-consent-policy-client'

export const ConsentPolicyAppMountHandler = withDependencies<IAppWillMountHandler>(
	[named(SiteFeatureConfigSymbol, name), ConsentPolicySymbol, named(FeatureExportsSymbol, name)],
	(
		config: ConsentPolicySiteConfig,
		consentPolicyAPI: IConsentPolicy,
		consentPolicyExports: IFeatureExportsStore<typeof name>
	) => {
		return {
			appWillMount() {
				const currentConsentPolicy = consentPolicyAPI.getCurrentConsentPolicy()
				consentPolicyExports.export({
					currentConsentPolicy,
					openSettingModal: (categories: Array<ConsentPolicyKey> = []) => {
						consentPolicyAPI.publishPolicyUpdateRequestedEvent(categories)
					},
				})
			},
		}
	}
)
