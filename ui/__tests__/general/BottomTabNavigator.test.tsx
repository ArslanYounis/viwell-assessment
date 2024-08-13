import { router, usePathname } from 'expo-router';
import BottomTabNavigator from 'ui/general/BottomTabNavigator';
import { act, fireEvent, render } from 'test/tamagui-setup-test';
import { EdgeInsets } from 'react-native-safe-area-context';

// Mock the dependencies
jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  usePathname: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(
    () =>
      ({
        top: 0,
        right: 0,
        bottom: 20,
        left: 0,
      } as EdgeInsets)
  ),
}));

jest.mock('assets/icons', () => ({
  HeartIconSvg: () => 'HeartIconSvg',
  HomeIconSvg: () => 'HomeIconSvg',
}));

describe('BottomTabNavigator', () => {
  const mockUseSafeAreaInsets = jest.requireMock(
    'react-native-safe-area-context'
  ).useSafeAreaInsets as jest.Mock<EdgeInsets>;
  beforeEach(() => {
    mockUseSafeAreaInsets.mockReturnValue({
      top: 0,
      right: 0,
      bottom: 20,
      left: 0,
    });
    (usePathname as jest.Mock).mockReturnValue('/private/products');
  });

  it('renders correctly', () => {
    const { getByText } = render(<BottomTabNavigator />);
    expect(getByText('Products')).toBeTruthy();
    expect(getByText('Wishlist')).toBeTruthy();
  });

  it('applies correct styles to active tab', async () => {
    const component = render(<BottomTabNavigator />);
    const activeTab = component.getByText('Products');
    expect(activeTab.props.style.color).toBe('#610C27');
  });

  it('applies correct styles to inactive tab', async () => {
    const component = render(<BottomTabNavigator />);
    const inactiveTab = component.getByText('Wishlist');
    expect(inactiveTab.props.style.color).toBe('#696969');
  });

  it('navigates to Products when Products tab is pressed', async () => {
    const component = render(<BottomTabNavigator />);
    const productsTab = component.getByText('Products');
    await act(async () => {
      fireEvent.press(productsTab);
    });
    expect(router.push).toHaveBeenCalledWith('/private/products');
  });

  it('navigates to Wishlist when Wishlist tab is pressed', async () => {
    const component = render(<BottomTabNavigator />);
    const wishlistTab = component.getByText('Wishlist');
    await act(async () => {
      fireEvent.press(wishlistTab);
    });
    expect(router.push).toHaveBeenCalledWith('/private/wishlist');
  });

  it('renders correct number of tabs', () => {
    const component = render(<BottomTabNavigator />);
    const tabs = component.getAllByTestId('tab');
    expect(tabs).toHaveLength(2);
  });
});
