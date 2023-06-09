import { render } from '../../lib';
import { Home } from '../Home';

test('Home 화면 렌더링 확인', () => {
  const { getByText } = render(<Home />);
  const expectText = getByText('메인페이지입니다');
  expect(expectText).toBeInTheDocument();
});
