import { convertColorToRGBAUnits, extractOpacity, applyOpacity, isHexaColor, isRGBAColor, roundToTwoDecimals, } from '@wix/editor-elements-common-utils';
import { withValidation } from '../../validations';
import { createColorValidator } from './validation';
import { getScopedVar } from './styleUtils';
import { cssVars } from './constants';
export const buildColorPropsSDKFactoryCreator = (propertyName) => (options = { supportOpacity: true }) => {
    const { prefix, supportOpacity, withoutDefaultValue } = options;
    const cssRule = getScopedVar({
        name: cssVars[propertyName],
        prefix,
    });
    const validateColor = createColorValidator({
        propertyName,
        cssProperty: supportOpacity ? 'rgbaColor' : 'rgbColor',
        supportAlpha: supportOpacity,
    });
    const _colorPropsSDKFactory = ({ setStyles, sdkData, createSdkState }) => {
        const editorInitialColor = sdkData?.initialSdkStyles?.[propertyName];
        const editorOpacity = extractOpacity(editorInitialColor);
        const initialValue = withoutDefaultValue ? undefined : editorInitialColor;
        const [state, setState] = createSdkState({ [propertyName]: initialValue }, propertyName);
        return Object.defineProperty({
            reset() {
                setState({ [propertyName]: initialValue });
                setStyles({ [cssRule]: undefined });
            },
        }, propertyName, {
            enumerable: true,
            set(value) {
                let colorValue = value;
                /**
                 * !Alert! This feature is intended.
                 * if mixin does not support opacity - cast it to RGB
                 */
                if (!supportOpacity && (isHexaColor(value) || isRGBAColor(value))) {
                    const [r, g, b] = convertColorToRGBAUnits(value);
                    colorValue = `rgb(${r}, ${g}, ${b})`;
                }
                /**
                 * !Alert! This feature is intended.
                 *  Editor color alpha gets modified by the amount of user color alpha
                 */
                if (typeof editorOpacity === 'number' && editorOpacity !== 1) {
                    const userOpacity = extractOpacity(value);
                    const opacity = Number.isFinite(userOpacity)
                        ? roundToTwoDecimals(editorOpacity * userOpacity)
                        : editorOpacity;
                    colorValue = applyOpacity(colorValue, opacity);
                }
                setState({ [propertyName]: colorValue });
                setStyles({ [cssRule]: colorValue });
            },
            get() {
                return state[propertyName];
            },
        });
    };
    return withValidation(_colorPropsSDKFactory, {
        type: ['object'],
        properties: {
            [propertyName]: {
                type: ['string', 'nil'],
            },
        },
    }, {
        [propertyName]: [validateColor],
    });
};
//# sourceMappingURL=colorPropsSDKFactoryBuilder.js.map