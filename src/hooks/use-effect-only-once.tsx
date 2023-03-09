import React from 'react';


export function useEffectOnlyOnce<
  _D,
> (callback: (deps: _D) => void, dependencies: _D, condition?: (deps: _D) => boolean) {
  const calledOnce = React.useRef(false);

  React.useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    if (!condition ? true : condition(dependencies)) {
      callback(dependencies);

      calledOnce.current = true;
    }
  }, [callback, condition, dependencies]);
}
