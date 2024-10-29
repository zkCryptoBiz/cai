import { withCompController } from '@wix/editor-elements-integrations/src/thunderbolt';
import type { VideoBoxProps, IVideoBoxStateRefValues } from '../VideoBox.types';

export default withCompController<
  VideoBoxProps,
  VideoBoxProps,
  VideoBoxProps,
  IVideoBoxStateRefValues
>(({ stateValues, mapperProps }) => {
  const { reducedMotion } = stateValues;
  return { ...mapperProps, reducedMotion };
});
