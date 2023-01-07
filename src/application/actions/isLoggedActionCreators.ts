const toggleIsLogged = () =>
  ({
    type: 'TOGGLE_IS_LOGGED',
  } as const);

export type IsLoggedAction = ReturnType<typeof toggleIsLogged>;
