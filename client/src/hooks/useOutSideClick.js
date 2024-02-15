import { useEffect } from 'react';

const useOutSideClickFrom = (ref, setter) => {
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [ref, setter]);
};

export default useOutSideClickFrom;
