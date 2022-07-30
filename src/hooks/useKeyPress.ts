import { KeyboardEventHandler, useEffect, useState } from 'react';

const useKeyPress = (targetKey: string, preventDefault?: boolean) => {
  const [keyIsPressed, setKeyIsPressed] = useState<boolean>(false);
  useEffect(()=>{
    window.addEventListener('keydown', onKeyDownListener);
    window.addEventListener('keyup', onKeyUpListener);
    return () => {
      window.removeEventListener('keydown', onKeyDownListener);
      window.removeEventListener('keyup', onKeyUpListener);
    }
  }, [])

  const onKeyDownListener = (event: KeyboardEvent) => {
    if (preventDefault) event.preventDefault();
    if (event.key === targetKey) setKeyIsPressed(true);
  }
  const onKeyUpListener = (event: KeyboardEvent) => {
    if (preventDefault) event.preventDefault();
    if (event.key === targetKey) setKeyIsPressed(false);
  }

  return keyIsPressed;
}

export { useKeyPress };
