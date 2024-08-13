import { render } from 'test/tamagui-setup-test';
import LoaderComponent from 'ui/general/LoaderComponent';
import { Text } from 'react-native';

jest.mock('assets/icons', () => ({
  EmptyListIconSvg: () => 'EmptyListIconSvg',
}));

describe('LoaderComponent', () => {
  it('renders the Spinner when isLoading is true', () => {
    const { getByTestId } = render(
      <LoaderComponent isLoading={true}>
        <></>
      </LoaderComponent>
    );
    expect(getByTestId('loader-spinner')).toBeTruthy();
  });

  it('renders the error message when hasData is false and isLoading is false', () => {
    const { getByText } = render(
      <LoaderComponent isLoading={false} hasData={false}>
        <></>
      </LoaderComponent>
    );
    expect(getByText('oops! Something went wrong!')).toBeTruthy();
  });

  it('renders a custom error message when provided and hasData is false', () => {
    const customErrorMessage = 'No data available!';
    const { getByText } = render(
      <LoaderComponent
        isLoading={false}
        hasData={false}
        errorMessage={customErrorMessage}
      >
        <></>
      </LoaderComponent>
    );
    expect(getByText(customErrorMessage)).toBeTruthy();
  });

  it('renders children when hasData is true', () => {
    const { getByText } = render(
      <LoaderComponent hasData={true}>
        <Text>Data Loaded</Text>
      </LoaderComponent>
    );
    expect(getByText('Data Loaded')).toBeTruthy();
  });
});
