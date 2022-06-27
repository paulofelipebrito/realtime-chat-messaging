import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { Sidebar } from '../Sidebar/Sidebar';
import { CompanyHeader } from './../CompanyHeader/CompanyHeader';
import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import { TeamChannelPreview } from './TeamChannelPreview';

const cookies = new Cookies();

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  const { client } = useChatContext();

  const logout = () => {
      cookies.remove("token");
      cookies.remove('userId');
      cookies.remove('username');
      cookies.remove('fullName');
      cookies.remove('avatarURL');
      cookies.remove('hashedPassword');
      cookies.remove('phoneNumber');

      window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } };

  return (
      <>
          <Sidebar logout={logout} />
          <div className="channel-list__list__wrapper">
              <CompanyHeader />
              <ChannelSearch setToggleContainer={setToggleContainer} />
              <ChannelList 
                  filters={filters}
                  channelRenderFilterFn={customChannelTeamFilter}
                  List={(listProps) => (
                      <TeamChannelList 
                          {...listProps}
                          type="team"
                          isCreating={isCreating}
                          setIsCreating={setIsCreating}
                          setCreateType={setCreateType} 
                          setIsEditing={setIsEditing}
                          setToggleContainer={setToggleContainer}
                      />
                  )}
                  Preview={(previewProps) => (
                      <TeamChannelPreview 
                          {...previewProps}
                          setIsCreating={setIsCreating}
                          setIsEditing={setIsEditing}
                          setToggleContainer={setToggleContainer}
                          type="team"
                      />
                  )}
              />
              <ChannelList 
                  filters={filters}
                  channelRenderFilterFn={customChannelMessagingFilter}
                  List={(listProps) => (
                      <TeamChannelList 
                          {...listProps}
                          type="messaging"
                          isCreating={isCreating}
                          setIsCreating={setIsCreating}
                          setCreateType={setCreateType} 
                          setIsEditing={setIsEditing}
                          setToggleContainer={setToggleContainer}
                      />
                  )}
                  Preview={(previewProps) => (
                      <TeamChannelPreview 
                          {...previewProps}
                          setIsCreating={setIsCreating}
                          setIsEditing={setIsEditing}
                          setToggleContainer={setToggleContainer}
                          type="messaging"
                      />
                  )}
              />
          </div>
      </>
  );
}

export default ChannelListContent;