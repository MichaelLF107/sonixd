import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useMeasure from 'react-use/lib/useMeasure';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Sidenav, Icon } from 'rsuite';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Server } from '../../types';
import {
  FixedSidebar,
  PlaylistDivider,
  SidebarCoverArtContainer,
  SidebarDragContainer,
} from './styled';
import { StyledButton } from '../shared/styled';
import { InfoModal } from '../modal/Modal';
import placeholderImg from '../../img/placeholder.png';
import SidebarPlaylists from './SidebarPlaylists';
import { setSidebar } from '../../redux/configSlice';
import { settings } from '../shared/setDefaultSettings';
import HomeIcon from '@mui/icons-material/Home';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AlbumIcon from '@mui/icons-material/Album';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PianoIcon from '@mui/icons-material/Piano';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import SideNavItem from './SideNavItem';

const Sidebar = ({
  expand,
  handleToggle,
  handleSidebarSelect,
  disableSidebar,
  font,
  titleBar,
  ...rest
}: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const playQueue = useAppSelector((state) => state.playQueue);
  const config = useAppSelector((state) => state.config);
  const [width, setWidth] = useState(Number(config.lookAndFeel.sidebar.width.replace('px', '')));
  const [isResizing, setIsResizing] = useState(false);
  const [showCoverArtModal, setShowCoverArtModal] = useState(false);
  const [throttledWidth, setThrottledWidth] = useState(
    Number(config.lookAndFeel.sidebar.width.replace('px', ''))
  );
  const [mainNavRef, { height: mainNavHeight }] = useMeasure<HTMLDivElement>();
  const [sidebarBodyRef, { height: sidebarBodyHeight }] = useMeasure<HTMLDivElement>();

  const getSidebarWidth = useCallback((num: number) => {
    if (num < 165) {
      return 165;
    }

    if (num > 400) {
      return 400;
    }

    return num;
  }, []);

  const handleResizeMove = useMemo(() => {
    const throttled = _.throttle((e: MouseEvent) => setThrottledWidth(e.clientX), 25);
    return (e: MouseEvent) => throttled(e);
  }, []);

  const handleResizeEnd = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const finalWidth = `${getSidebarWidth(e?.clientX)}px`;
        dispatch(setSidebar({ width: finalWidth }));
        settings.set('sidebar.width', finalWidth);
        setIsResizing(false);
        document.body.style.cursor = 'default';
      }
    },
    [dispatch, getSidebarWidth, isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [handleResizeEnd, isResizing, handleResizeMove]);

  useEffect(() => {
    setWidth(getSidebarWidth(throttledWidth));
  }, [dispatch, getSidebarWidth, throttledWidth]);

  useEffect(() => {
    setTimeout(() => {
      const windowPath = history.location.pathname;
      console.log(windowPath);
    }, 1000)
    return () => {};
  }, [history.location.pathname]);

  return (
    <>
      <FixedSidebar
        id="sidebar"
        width={expand ? `${width}px` : 56}
        font={font}
        $titleBar={titleBar} // transient prop to determine position
        onClick={rest.onClick}
      >
        <Sidenav style={{ height: '100%' }} expanded={true} appearance="default">
          {expand && config.lookAndFeel.sidebar.coverArt && (
            <SidebarCoverArtContainer height={`${width}px`}>
              <LazyLoadImage
                onClick={() => setShowCoverArtModal(true)}
                src={
                  playQueue.current?.image.replace(
                    /&size=\d+|width=\d+&height=\d+&quality=\d+/,
                    ''
                  ) || placeholderImg
                }
              />
              <StyledButton
                size="xs"
                onClick={() => {
                  dispatch(setSidebar({ coverArt: false }));
                  settings.set('sidebar.coverArt', false);
                }}
                $circle
              >
                <Icon icon="down" />
              </StyledButton>
            </SidebarCoverArtContainer>
          )}

          <Sidenav.Body
            style={{
              height: expand
                ? `calc(100% - ${config.lookAndFeel.sidebar.coverArt ? width : 0}px)`
                : '100%',
              overflowY: 'auto',
            }}
          >
            <div ref={sidebarBodyRef} style={{ height: '100%' }}>
              {expand && (
                <SidebarDragContainer
                  $resizing={isResizing}
                  onMouseDown={() => {
                    setIsResizing(true);
                    document.body.style.cursor = 'w-resize';
                  }}
                />
              )}
                <div ref={mainNavRef} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <SideNavItem path='/' history={history}>
                    <HomeIcon fontSize='inherit' />
                    {t('Home')}
                  </SideNavItem>
                  <SideNavItem path='/nowplaying' history={history}>
                    <HeadphonesIcon fontSize='inherit' />
                    {t('Now Playing')}
                  </SideNavItem>
                  <SideNavItem path='/playlist' history={history}>
                    <QueueMusicIcon fontSize='inherit' />
                    {t('Playlists')}
                  </SideNavItem>
                  <SideNavItem path='/starred' history={history}>
                    <FavoriteIcon fontSize='inherit' />
                    {t('Favorites')}
                  </SideNavItem>
                  {config.serverType === Server.Jellyfin && (
                    <SideNavItem path='/library/music' history={history}>
                      <LibraryMusicIcon fontSize='inherit' />
                      {t('Songs')}
                    </SideNavItem>
                  )}
                  <SideNavItem path='/library/album' history={history}>
                    <AlbumIcon fontSize='inherit' />
                    {t('Albums')}
                  </SideNavItem>
                  <SideNavItem path='/library/artist' history={history}>
                    <AccountBoxIcon fontSize='inherit' />
                    {t('Artists')}
                  </SideNavItem>
                  <SideNavItem path='/library/genre' history={history}>
                    <PianoIcon fontSize='inherit' />
                    {t('Genres')}
                  </SideNavItem>
                  {useAppSelector((state) => state.config).serverType !== 'funkwhale' && (
                    <>
                      <SideNavItem path='/library/folder' history={history}>
                        <FolderCopyIcon fontSize='inherit' />
                        {t('Folders')}
                      </SideNavItem>
                    </>
                  )}
                  <SideNavItem path='/config' history={history}>
                    <SettingsIcon fontSize='inherit' />
                    {t('Config')}
                  </SideNavItem>
                </div>
              {expand &&
                !disableSidebar &&
                config.lookAndFeel.sidebar.selected.includes('playlistList') && (
                  <div
                    style={{
                      height: `${
                        sidebarBodyHeight - mainNavHeight < 100
                          ? 100
                          : sidebarBodyHeight - mainNavHeight
                      }px`,
                      overflow: 'hidden',
                      overflowY: 'auto',
                    }}
                  >
                    <>
                      <PlaylistDivider />
                      <SidebarPlaylists width={width} />
                    </>
                  </div>
                )}
            </div>
          </Sidenav.Body>
        </Sidenav>
      </FixedSidebar>
      <InfoModal show={showCoverArtModal} handleHide={() => setShowCoverArtModal(false)}>
        <LazyLoadImage
          src={
            playQueue.current?.image.replace(/&size=\d+|width=\d+&height=\d+&quality=\d+/, '') ||
            placeholderImg
          }
          style={{
            width: 'auto',
            height: 'auto',
            minHeight: '50vh',
            maxHeight: '70vh',
            maxWidth: '95vw',
          }}
        />
      </InfoModal>
    </>
  );
};

export default Sidebar;
