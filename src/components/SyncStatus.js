import React, { useContext } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { DataContext } from '../context/DataContext';

const SyncStatus = () => {
  const { syncStatus } = useContext(DataContext);
  
  return (
    <div className={`sync-status ${syncStatus.online ? 'online' : 'offline'}`}>
      {syncStatus.online ? (
        <>
          <Wifi size={16} />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff size={16} />
          <span>Offline</span>
        </>
      )}
    </div>
  );
};

export default SyncStatus;