import { isHexaColor, isRGBAColor, convertColorToRGBAUnits, } from '@wix/editor-elements-common-utils';
import { withValidation } from '../../validations';
import { getScopedVar } from './styleUtils';
import { createColorValidator } from './validation';
import { cssVars } from './constants';
export const createTextColorPropsSDKFactory = (options = {}) => {
    const { prefix, withoutDefaultValue } = options;
    const cssRule = getScopedVar({
        name: cssVars.textColor,
        prefix,
    });
    const validateColor = createColorValidator({
        propertyName: 'color',
        cssProperty: 'rgbColor',
        supportAlpha: false,
    });
    const _textColorPropsSDKFactory = ({ setStyles, sdkData, createSdkState }) => {
        const editorInitialColor = sdkData?.initialSdkStyles?.color;
        const [state, setState] = createSdkState({
            textColor: withoutDefaultValue ? undefined : editorInitialColor,
        }, 'textColor');
        return {
            set color(value) {
                let textColor = value;
                // RGBA values are casted to RGB by default
                if (isHexaColor(value) || isRGBAColor(value)) {
                    const [r, g, b] = convertColorToRGBAUnits(value);
                    textColor = `rgb(${r}, ${g}, ${b})`;
                }
                setState({ textColor });
                setStyles({ [cssRule]: textColor });
            },
            get color() {
                return state.textColor;
            },
            reset() {
                setState({
                    textColor: withoutDefaultValue ? undefined : editorInitialColor,
                });
                setStyles({ [cssRule]: undefined });
            },
        };
    };
    return withValidation(_textColorPropsSDKFactory, {
        type: ['object'],
        properties: {
            color: {
                type: ['string', 'nil'],
            },
        },
    }, {
        color: [validateColor],
    });
};
//# sourceMappingURL=textColorPropsSDKFactory.js.map