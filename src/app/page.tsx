import { NextPage } from 'next';
import SignUp from './components/SignUp/SignUp';
import StarryBackground from './components/StarryBackground/StarryBackground';

const HomePage: NextPage = () => {
  return (
    <StarryBackground>
      <SignUp />
    </StarryBackground>
  );
};

export default HomePage;
