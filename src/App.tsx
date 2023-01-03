import Comments from 'components/Comments';

const App = () => {
  return (
    <div>
      <Comments isLogged userId={10} projectId={10000} />
    </div>
  );
};

export default App;
