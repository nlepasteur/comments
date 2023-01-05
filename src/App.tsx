import Comments from 'components/Comments';

import './App.scss';

const App = () => {
  return (
    <div>
      <div className="d-flex flex-column flex-lg-row">
        <div className="col-lg-9 col-xl-8 bg-dark"></div>
        <Comments isLogged userId={10} projectId={10000} />
      </div>
    </div>
  );
};

export default App;
