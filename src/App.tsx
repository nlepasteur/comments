import type { RootState, AppDispatch } from 'application/types';
import type { ConnectedProps } from 'react-redux';

import './App.scss';

import { connect } from 'react-redux';

import Comments from './components/Comments';

const mapState = ({ isLogged }: RootState) => ({ isLogged });

const mapDispatch = (dispatch: AppDispatch) => ({
  toggleIsLogged: () => dispatch({ type: 'TOGGLE_IS_LOGGED' }),
});

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ToggleUserLogged = ({
  toggleIsLogged,
}: ReturnType<typeof mapDispatch>) => (
  <form className="toggle-logged-form">
    <div className="form-switch">
      <input
        type="checkbox"
        id="logged"
        className="form-check-input"
        onChange={toggleIsLogged}
      />
      <label form="logged" className="form-check-label">
        Logged user UI
      </label>
    </div>
  </form>
);

const App = connector((props: PropsFromRedux) => {
  return (
    <div className="d-flex flex-justify-stretch flex-column flex-lg-row">
      <div className="bg-dark flex-grow-1">
        <ToggleUserLogged {...props} />
      </div>
      <Comments
        isLogged={props.isLogged}
        userId={props.isLogged ? 10 : 123456789} // voir db.json penser à accorder les comments supposés venir de user
        userAvatarUrl="https://via.placeholder.com/32x32.png?text=User+Avatar"
      />
    </div>
  );
});

export default App;
