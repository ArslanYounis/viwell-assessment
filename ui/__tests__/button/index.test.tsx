import { BackIconSvg } from 'assets/icons';
import { render } from 'test/tamagui-setup-test';
import Button from 'ui/button';

describe('testing global app button from ui/button', () => {
  it('renders button with label correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const buttonLabel = getByText('Click me');
    expect(buttonLabel).toBeDefined();
  });

  it('renders button with icon correctly', () => {
    const { queryByTestId } = render(
      <Button icon={() => <BackIconSvg />}>Click me</Button>
    );
    const buttonIcon = queryByTestId('back-icon-svg');
    expect(buttonIcon).toBeTruthy();
  });

  it('renders button without icon correctly', () => {
    const { queryByTestId } = render(<Button>Click me</Button>);
    const buttonIcon = queryByTestId('plus-icon-svg');
    expect(buttonIcon).toBeFalsy();
  });

  test('renders primary button with medium size', () => {
    const { getByTestId } = render(
      <Button testID='button' variant='primary' size='medium'>
        Click me
      </Button>
    );
    const button = getByTestId('button');
    expect(button).toBeDefined();
  });

  test('renders secondary button with large size', () => {
    const { getByTestId } = render(
      <Button testID='button' variant='secondary' size='large'>
        Click me
      </Button>
    );
    const button = getByTestId('button');

    expect(button).toBeDefined();
  });

  test('renders button with spinner when loading', () => {
    const { queryByTestId } = render(<Button isLoading>Click me</Button>);
    const buttonSpinner = queryByTestId('button-loading-spinner');

    expect(buttonSpinner).toBeDefined();
  });

  test('renders button without spinner when loading false', () => {
    const { queryByTestId } = render(
      <Button isLoading={false}>Click me</Button>
    );
    const buttonSpinner = queryByTestId('button-loading-spinner');
    expect(buttonSpinner).toBeNull();
  });
});
