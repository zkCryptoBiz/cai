import { withValidation } from '../validations';
import { reportError } from '../reporters';
import { messages } from '../messages';
import { createBackgroundColorPropsSDKFactory, createBorderColorPropsSDKFactory, createBorderRadiusPropsSDKFactory, createBorderWidthPropsSDKFactory, createForegroundColorPropsSDKFactory, createTextColorPropsSDKFactory, createFillColorPropsSDKFactory, createStrokeColorPropsSDKFactory, } from './styleSDKFactories';
import { composeFactory } from './composeFactoryWithReset';
const STYLE_SDK_RESET_METHOD_NAME = 'reset';
function composeSDKFactoriesWithReset(...sources) {
    const compose = composeFactory(STYLE_SDK_RESET_METHOD_NAME);
    return api => {
        const objs = sources.map(source => source(api));
        const composedFactories = compose(...objs);
        // we "hide" the reset method as it's not a public API
        Object.defineProperty(composedFactories, STYLE_SDK_RESET_METHOD_NAME, {
            enumerable: false,
        });
        return composedFactories;
    };
}
const _stylePropsSDKFactory = (supportedSDKFactories) => api => {
    const styleSDKs = supportedSDKFactories(api);
    styleSDKs.removeProperty = (propertyName) => {
        if (!(propertyName in styleSDKs)) {
            const styleSdkPropNames = Object.keys(styleSDKs).filter(k => k !== 'removeProperty');
            reportError(messages.invalidEnumValueMessage({
                functionName: 'removeProperty',
                propertyName: 'propertyName',
                value: propertyName,
                enum: styleSdkPropNames,
                index: undefined,
            }));
            return;
        }
        styleSDKs[STYLE_SDK_RESET_METHOD_NAME]?.(propertyName);
    };
    return {
        get style() {
            return styleSDKs;
        },
    };
};
const styleFactories = {
    BackgroundColor: createBackgroundColorPropsSDKFactory,
    BorderColor: createBorderColorPropsSDKFactory,
    BorderWidth: createBorderWidthPropsSDKFactory,
    ForegroundColor: createForegroundColorPropsSDKFactory,
    BorderRadius: createBorderRadiusPropsSDKFactory,
    TextColor: createTextColorPropsSDKFactory,
    FillColor: createFillColorPropsSDKFactory,
    StrokeColor: createStrokeColorPropsSDKFactory,
};
const styleFactoriesDefaultOptions = {
    BackgroundColor: {
        supportOpacity: true,
    },
    BorderColor: {
        supportOpacity: true,
    },
    BorderWidth: {},
    ForegroundColor: {
        supportOpacity: true,
    },
    BorderRadius: {},
    TextColor: {},
    FillColor: {
        supportOpacity: true,
    },
    StrokeColor: {
        supportOpacity: true,
    },
};
export const createStylePropsSDKFactory = (list, styleSDKOptions) => {
    const supported = Object.keys(list).filter(value => list[value]);
    const supportedSDKFactories = supported.map(value => {
        const stylePropertyOptions = typeof list[value] !== 'boolean'
            ? list[value]
            : styleFactoriesDefaultOptions[value];
        return styleFactories[value]({
            prefix: styleSDKOptions?.cssVarPrefix,
            withoutDefaultValue: stylePropertyOptions.withoutDefaultValue,
            supportOpacity: stylePropertyOptions.supportOpacity,
        });
    });
    return withValidation(_stylePropsSDKFactory(composeSDKFactoriesWithReset(...supportedSDKFactories)), {
        type: ['object'],
        properties: {
            style: {
                type: ['object'],
            },
        },
    });
};
//# sourceMappingURL=stylePropsSDKFactory.js.map