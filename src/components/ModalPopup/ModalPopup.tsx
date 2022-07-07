import './ModalPopup.scss';
import React, { useEffect, useMemo } from 'react';
import { Portal } from 'react-portal';
import { getClassnamesFromObject } from '../../features/get-classnames-from-object';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { scrollActions } from '../../redux/reducers/scrollReducer/scrollReducer';

interface IModalPopupProps {
  blur?: boolean,
  className?: string,
  node?: HTMLElement,
  children?: React.ReactNode,
  contentVerticalAlign?: 'auto' | 'center';
  contentHorizontalAlign?: 'auto' | 'center';
  disableScroll?: boolean
}

const ModalPopup = ({ blur = true, disableScroll = true , className = '', node = document.body, contentHorizontalAlign = 'center', contentVerticalAlign = 'center', children }: IModalPopupProps) => {
  const popupId = useMemo(() => Math.random(), []);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (disableScroll) {dispatch(scrollActions.setNoScrollRequest(popupId));}
    return () => {dispatch(scrollActions.removeNoScrollRequest(popupId))};
  }, [])
  const classNames = getClassnamesFromObject({
    'ModalPopup' : true,
    'ModalPopup--with-blur': blur,
    'ModalPopup--with-horizontal-center': contentHorizontalAlign === 'center',
    'ModalPopup--with-vertical-center': contentVerticalAlign === 'center',
  }) + `${className ? ` ${className}` : ''}`;

  return (
    <Portal node={node}>
      <div className={classNames}>
        {children}
      </div>
    </Portal>
  );
};

export default ModalPopup;