import { useReducer, useEffect } from 'react';

type State<D> = {
  error: null | string;
  status: 'init' | 'fetching' | 'success' | 'failure';
  data: D[];
};

type Action<D> =
  | { type: 'FETCH' }
  | { type: 'FAILURE'; payload: string }
  | { type: 'SUCCESS'; payload: D[] };

export function useFetch<D>(request: string) {
  const initialState: State<D> = {
    error: null,
    status: 'init',
    data: [],
  };

  const reducer = (state: State<D>, action: Action<D>): State<D> => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, status: 'fetching', error: null };
      case 'FAILURE':
        return { ...state, status: 'failure', error: action.payload };
      case 'SUCCESS':
        return { error: null, status: 'success', data: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: 'FETCH' });
        const response = await fetch(request);
        const parsed = await response.json();
        if (!response.ok) {
          throw new Error('');
        }
        dispatch({ type: 'SUCCESS', payload: parsed });
      } catch (error: any) {
        dispatch({ type: 'FAILURE', payload: error.message });
      }
    })();
  }, [request]);

  return state;
}

export default useFetch;
