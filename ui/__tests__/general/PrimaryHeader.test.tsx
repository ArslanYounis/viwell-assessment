import { render, fireEvent } from 'test/tamagui-setup-test';
import PrimaryHeader from 'ui/general/PrimaryHeader';
import { router } from 'expo-router';

// Mock the dependencies
jest.mock('assets/icons', () => ({
  BackIconSvg: () => 'BackIconSvg',
}));

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

describe('PrimaryHeader', () => {
  it('renders the title when provided', () => {
    const { getByText } = render(<PrimaryHeader title='Test Title' />);
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('does not render the back button when hasBackBtn is false', () => {
    const { queryByTestId } = render(<PrimaryHeader hasBackBtn={false} />);
    expect(queryByTestId('back-icon-svg')).toBeNull();
  });

  it('calls the onPressBack function when back button is pressed', () => {
    const onPressBackMock = jest.fn();
    const { getByTestId } = render(
      <PrimaryHeader hasBackBtn={true} onPressBack={onPressBackMock} />
    );
    fireEvent.press(getByTestId('back-button'));
    expect(onPressBackMock).toHaveBeenCalled();
  });

  it('calls the router.back function when back button is pressed and no onPressBack is provided', () => {
    const { getByTestId } = render(<PrimaryHeader hasBackBtn={true} />);
    fireEvent.press(getByTestId('back-button'));
    expect(router.back).toHaveBeenCalled();
  });
});
