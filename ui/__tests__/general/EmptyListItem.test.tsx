import { render } from 'test/tamagui-setup-test';
import EmptyListItem from 'ui/general/EmptyListItem';

describe('EmptyListItem Component', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<EmptyListItem />);
    expect(getByText('No Data')).toBeTruthy();
    expect(getByTestId('empty-list-icon')).toBeTruthy();
  });

  it('renders the loading spinner when isLoading is true', () => {
    const { getByTestId, queryByText } = render(
      <EmptyListItem isLoading={true} />
    );
    expect(getByTestId('empty-list-spinner')).toBeTruthy();
    expect(queryByText('No Data')).toBeNull();
  });

  it('renders with a custom title', () => {
    const customTitle = 'Loading...';
    const { getByText } = render(<EmptyListItem title={customTitle} />);
    expect(getByText(customTitle)).toBeTruthy();
  });

  it('applies ContainerProps to YStack', () => {
    const { getByTestId } = render(
      <EmptyListItem
        ContainerProps={{ testID: 'custom-container', ai: 'flex-start' }}
      />
    );
    const container = getByTestId('custom-container');
    expect(container.props.style.alignItems).toBe('flex-start');
  });
});
