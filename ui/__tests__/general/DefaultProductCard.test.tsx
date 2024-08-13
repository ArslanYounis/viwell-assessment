import { render, fireEvent } from 'test/tamagui-setup-test';
import DefaultProductCard from 'ui/general/DefaultProductCard';
import { router } from 'expo-router';
import { IProductType } from 'types/product.types';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

const mockProduct: IProductType = {
  id: 1,
  title: 'Test Product',
  category: 'Test Category',
  price: 99.99,
  thumbnail: 'https://example.com/image.jpg',
  rating: 4,
  brand: 'ABC',
  tags: [],
  description: '',
  sku: '',
  stock: 0,
  weight: 0,
  reviews: [],
};

describe('DefaultProductCard', () => {
  it('should render product details correctly', () => {
    const { getByText } = render(<DefaultProductCard product={mockProduct} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('Test Category')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
  });

  it('should call onPressFavorite when the favorite button is pressed', () => {
    const onPressFavoriteMock = jest.fn();
    const component = render(
      <DefaultProductCard
        product={mockProduct}
        onPressFavorite={onPressFavoriteMock}
      />
    );

    const favoriteButton = component.getByTestId('icon-button');
    fireEvent.press(favoriteButton);

    expect(onPressFavoriteMock).toHaveBeenCalledTimes(1);
  });

  it('should navigate to product detail page when the card is pressed', () => {
    const component = render(<DefaultProductCard product={mockProduct} />);

    fireEvent.press(component.getByTestId('product-card'));

    expect(router.push).toHaveBeenCalledWith(
      `/private/product-detail/${mockProduct.id}`
    );
  });
});
