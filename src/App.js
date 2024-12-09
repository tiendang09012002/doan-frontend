import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Admin from "./shared/components/Layout/Admin"
import User from "./shared/components/Layout/user"


function App() {
  const user = useSelector(({ Auth }) => Auth.user)
  console.log(user);
  return (
    <BrowserRouter>
      {user.isAdmin && <Admin />}
      {!user.isAdmin && <User />}

    </BrowserRouter>

  );
}

export default App;
