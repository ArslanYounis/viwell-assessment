import { render } from 'test/tamagui-setup-test';
import IconButton from 'ui/general/IconButton';
import { HomeIconSvg } from 'assets/icons';

const MockIcon = () => <HomeIconSvg />;

describe('IconButton Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<IconButton icon={MockIcon} />);
    expect(getByTestId('home-icon')).toBeTruthy();
  });

  it('renders the loading spinner when isLoading is true', () => {
    const { getByTestId, queryByTestId } = render(
      <IconButton isLoading={true} />
    );
    expect(getByTestId('icon-button-spinner')).toBeTruthy();
    expect(queryByTestId('home-icon')).toBeNull();
  });

  it('disables the button when isLoading is true', () => {
    const { getByTestId } = render(<IconButton isLoading={true} />);
    expect(getByTestId('icon-button').props.disabled).toBe(true);
  });

  it('disables the button when the disabled prop is true', () => {
    const { getByTestId } = render(<IconButton disabled={true} />);
    expect(getByTestId('icon-button').props.disabled).toBe(true);
  });
});
