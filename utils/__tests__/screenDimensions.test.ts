import { Dimensions, PixelRatio } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'utils/screenDimensions';

describe('screenDimensions utilities', () => {
  // Mock the Dimensions and PixelRatio modules
  beforeAll(() => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 360,
      height: 640,
      scale: 2,
      fontScale: 2,
    });
    jest
      .spyOn(PixelRatio, 'roundToNearestPixel')
      .mockImplementation(value => Math.round(value));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should correctly convert width percentage to DP', () => {
    const result = widthPercentageToDP('50%');
    expect(result).toBe(180); // 50% of 360 is 180
  });

  it('should correctly convert height percentage to DP', () => {
    const result = heightPercentageToDP('50%');
    expect(result).toBe(320); // 50% of 640 is 320
  });

  it('should round to the nearest pixel for widthPercentageToDP', () => {
    const result = widthPercentageToDP('33.33%');
    expect(result).toBe(120); // 33.33% of 360 is approximately 120
  });

  it('should round to the nearest pixel for heightPercentageToDP', () => {
    const result = heightPercentageToDP('33.33%');
    expect(result).toBe(213); // 33.33% of 640 is approximately 213
  });
});
