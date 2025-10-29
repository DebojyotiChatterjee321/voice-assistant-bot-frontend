import { useEffect } from 'react';

import type { PipecatBaseChildProps } from '@pipecat-ai/voice-ui-kit';
import {
  ConnectButton,
  ConversationPanel,
  EventsPanel,
  UserAudioControl,
} from '@pipecat-ai/voice-ui-kit';

import type { TransportType } from '../../config';
import { TransportSelect } from './TransportSelect';

interface AppProps extends PipecatBaseChildProps {
  transportType: TransportType;
  onTransportChange: (type: TransportType) => void;
  availableTransports: TransportType[];
}

export const App = ({
  client,
  handleConnect,
  handleDisconnect,
  transportType,
  onTransportChange,
  availableTransports,
}: AppProps) => {
  useEffect(() => {
    client?.initDevices();
  }, [client]);

  const showTransportSelector = availableTransports.length > 1;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between gap-4 p-4">
        {showTransportSelector ? (
          <TransportSelect
            transportType={transportType}
            onTransportChange={onTransportChange}
            availableTransports={availableTransports}
          />
        ) : (
          <div />
        )}
        <div className="w-full flex flex-col-reverse flex-wrap justify-center items-center gap-8">
          <ConnectButton
            size="lg"
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
          <UserAudioControl size="lg" />
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-4">
        <div className="h-full overflow-hidden">
          <ConversationPanel />
        </div>
      </div>
      <div className="h-96 overflow-hidden px-4 pb-4">
        <EventsPanel />
      </div>
    </div>
  );
};
