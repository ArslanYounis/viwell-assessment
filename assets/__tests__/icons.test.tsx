import React from 'react';
import { render } from 'test/tamagui-setup-test';
import {
  BackIconSvg,
  HomeIconSvg,
  StarIconSvg,
  HeartIconSvg,
  EmptyListIconSvg,
} from 'assets/icons';

const testIconRendering = (IconComponent: React.FC, testID: string) => {
  it(`renders ${testID} correctly`, () => {
    const { getByTestId } = render(<IconComponent />);
    const icon = getByTestId(testID);
    expect(icon).toBeTruthy();
  });
};

describe('SVG Icons', () => {
  testIconRendering(BackIconSvg, 'back-icon-svg');
  testIconRendering(StarIconSvg, 'star-icon');
  testIconRendering(EmptyListIconSvg, 'empty-list-icon');

  it('renders HomeIconSvg correctly with default props', () => {
    const { getByTestId } = render(<HomeIconSvg />);
    const icon = getByTestId('home-icon');
    expect(icon).toBeTruthy();
  });

  it('renders HomeIconSvg correctly with custom props', () => {
    const { getByTestId } = render(<HomeIconSvg color='#000' fill='#fff' />);
    const icon = getByTestId('home-icon');
    expect(icon).toBeTruthy();
  });

  it('renders HeartIconSvg correctly with default props', () => {
    const { getByTestId } = render(<HeartIconSvg />);
    const icon = getByTestId('heart-icon');
    expect(icon).toBeTruthy();
  });

  it('renders HeartIconSvg correctly with custom props', () => {
    const { getByTestId } = render(<HeartIconSvg color='#000' fill='#fff' />);
    const icon = getByTestId('heart-icon');
    expect(icon).toBeTruthy();
  });
});
