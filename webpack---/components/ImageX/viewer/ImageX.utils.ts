import type { Override } from '@wix/editor-elements-types/utils';
import type {
  AlignType,
  FittingType,
  ImageTransformTarget,
  ImageDataAttributes,
  ImageTransformOptions,
} from '@wix/image-kit';
import { getData } from '@wix/image-kit';
// TODO: replace import of image-kit with window.__imageClientApi__ (here and in MusicPlayer.mapper.ts and SeoTpaGallery.mapper.ts)
import type { Crop, FocalPoint } from '@wix/thunderbolt-becky-types';
import type { ImageXImageData } from '@wix/thunderbolt-components-native';
import type {
  IImageXProps,
  ObjectFit,
  ResponsiveImageInfo,
} from '../ImageX.types';

const DEFAULT_MEDIA = '(max-width: 1920px)';
const MAX_BREAKPOINT = 2000;
const DEFAULT_MAX_BP = 1920;
const SIZES_LIST = [750, 1000, 1500, 2000, 3000, 4000];
const DPR_LIST = [1, 2];

function shallowEqual(object1: any = {}, object2: any = {}) {
  for (const key of Object.keys(object1)) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

const breakpointHasOverride = (
  layout: ResponsiveImageInfo['layout'],
  scopedData: ResponsiveImageInfo['scopedData'],
  previousBreakpointData: ResponsiveImageInfo,
) => {
  return (
    !shallowEqual(layout.width, previousBreakpointData.layout.width) ||
    !shallowEqual(layout.height, previousBreakpointData.layout.height) ||
    !shallowEqual(scopedData?.crop, previousBreakpointData?.scopedData?.crop) ||
    !shallowEqual(
      scopedData?.focalPoint,
      previousBreakpointData?.scopedData?.focalPoint,
    )
  );
};

export const getDisplayModeStyle = (
  id: string,
  displayMode: string,
  aspectRatio: number,
  useNativeAspectRatio: boolean,
) => {
  if ('fitWidth' === displayMode) {
    if (useNativeAspectRatio) {
      return `#${id.replace('#', '')} {aspect-ratio: ${1 / aspectRatio};}`;
    }
    return (
      `#${id.replace('#', '')}::before {--aspect-ratio: ${aspectRatio};` +
      `content: attr(x);display: block;padding-top: calc(var(--aspect-ratio) * 100%);}`
    );
  }
  return '';
};

export const getMediaUrlByContext = (imageUri: string = '') => {
  const isExternalUrl = /(^https?)|(^data)|(^blob)|(^\/\/)/.test(imageUri);
  if (isExternalUrl) {
    return imageUri;
  }
  let path = `${staticMediaUrl()}/`;
  if (imageUri) {
    if (/^micons\//.test(imageUri)) {
      path = staticMediaUrl();
    } else if (/[^.]+$/.exec(imageUri)![0] === 'ico') {
      // if the image is an icon then it's taken from a slightly different place
      path = path.replace('media', 'ficons');
    }
  }
  return path + imageUri;
};

function staticMediaUrl() {
  return (
    (typeof window !== 'undefined' &&
      (window as any).serviceTopology &&
      (window as any).serviceTopology.staticMediaUrl) ||
    'https://static.wixstatic.com/media'
  );
}

export const getImageUri = (
  imageData: Override<ImageXImageData, { crop: Crop | null | undefined }>,
  displayMode: FittingType,
  alignType: AlignType,
  targetData: ImageTransformTarget,
  options: ImageTransformOptions = {},
): { uri: string; css: ImageDataAttributes['css'] } => {
  const { uri, width, height, name, crop, focalPoint } = imageData;
  const { height: targetHeight, width: targetWidth } = targetData;
  const image = getData(
    displayMode || 'fill',
    {
      id: uri,
      width,
      height,
      crop: crop || undefined,
      name,
      focalPoint: focalPoint as FocalPoint,
    },
    {
      alignment: alignType,
      htmlTag: 'img',
      width: targetWidth,
      height: targetHeight,
    },
    options,
  );

  return {
    uri: getMediaUrlByContext(image.uri),
    css: image.css,
  };
};

const getFormattedSizesAttribute = (layout: ResponsiveImageInfo['layout']) => {
  const { type, value } = layout.width;
  const unit = type === 'px' ? 'px' : 'vw';
  return `${Math.ceil(value as number)}${unit}`;
};

const getSrcsetString = (
  imageData: IImageXProps['imageInfo']['imageData'],
  alignType: IImageXProps['imageInfo']['alignType'],
  width: number,
  height: number,
  crop?: Crop,
  focalPoint?: FocalPoint,
  options: ImageTransformOptions = {},
) => {
  const { uri } = getImageUri(
    { ...imageData, crop, focalPoint },
    imageData.displayMode,
    alignType,
    {
      width,
      height,
    },
    options,
  );
  return `${uri} ${Math.ceil(width)}w`;
};

const getHeightFromAspectRatio = (width: number, aspectRatio: number) =>
  Math.ceil(width * aspectRatio);

export const getResponsiveImageSources = (
  responsiveImagesInfo: Array<ResponsiveImageInfo>,
  imageData: IImageXProps['imageInfo']['imageData'],
  alignType: IImageXProps['imageInfo']['alignType'],
  options: ImageTransformOptions = {},
) => {
  const originalAspectRatio = imageData.height / imageData.width;
  return responsiveImagesInfo
    .filter(
      ({ breakpointMax }) => !(breakpointMax && breakpointMax > MAX_BREAKPOINT),
    )
    .filter(
      ({ layout, scopedData, breakpointMax }, index, arr) =>
        !breakpointMax ||
        (index > 0 &&
          breakpointHasOverride(layout, scopedData, arr[index - 1])),
    )
    .map(({ breakpointMax, layout, scopedData, minmax }) => {
      let srcset = '';
      const widthRatio = parseFloat(layout.width.value as string) / 100;
      const aspectRatio =
        layout.height.type === 'auto'
          ? originalAspectRatio
          : parseFloat(layout.height.value as string);

      const widthAttribute = Math.ceil(
        layout.width.type === 'px'
          ? layout.width.value
          : (breakpointMax || DEFAULT_MAX_BP) * widthRatio,
      );
      const heightAttribute =
        layout.width.type === 'px' && layout.height.type === 'px'
          ? Math.ceil(layout.height.value)
          : getHeightFromAspectRatio(widthAttribute, aspectRatio);

      if (layout.width.type === 'px') {
        srcset = DPR_LIST.map((dpr: number) => {
          const width = widthAttribute * dpr;
          const height = heightAttribute * dpr;

          return getSrcsetString(
            imageData,
            alignType,
            width,
            height,
            scopedData?.crop,
            scopedData?.focalPoint,
            options,
          );
        }).join(', ');
      } else if (
        ['auto', 'aspectRatio'].includes(layout.height.type) &&
        ['vw'].includes(layout.width.type)
      ) {
        srcset = SIZES_LIST.filter(
          size => size <= (breakpointMax ?? MAX_BREAKPOINT) * 2,
        )
          .map(size => {
            const targetWidth = size * widthRatio;
            const targetHeight = getHeightFromAspectRatio(
              targetWidth,
              aspectRatio,
            );

            return getSrcsetString(
              imageData,
              alignType,
              targetWidth,
              targetHeight,
              scopedData?.crop,
              scopedData?.focalPoint,
              options,
            );
          })
          .join(', ');
      }
      if (srcset) {
        return {
          srcset,
          media: minmax || DEFAULT_MEDIA,
          sizes: getFormattedSizesAttribute(layout),
          widthAttribute,
          heightAttribute,
        };
      } else {
        return {};
      }
    });
};

export const getResponsiveImageObjectFit = (
  sources: IImageXProps['sources'],
  responsiveImagesInfo: Array<ResponsiveImageInfo>,
  imageData: IImageXProps['imageInfo']['imageData'],
  alignType: IImageXProps['imageInfo']['alignType'],
) => {
  const { heightAttribute, widthAttribute } = sources[0];
  const crop = responsiveImagesInfo[0]?.scopedData?.crop;
  const focalPoint = responsiveImagesInfo[0]?.scopedData?.focalPoint;

  const { css } = getImageUri(
    { ...imageData, crop, focalPoint },
    imageData.displayMode,
    alignType,
    {
      width: widthAttribute,
      height: heightAttribute,
    },
  );
  return (css?.img?.objectFit as ObjectFit) || 'cover';
};

export const hasValidUnits = (dataLayout: ResponsiveImageInfo['layout']) =>
  ['px', 'vw'].includes(dataLayout.width.type) &&
  ['aspectRatio', 'auto', 'px'].includes(dataLayout.height.type);
