import { useEffect, useState } from 'react';
import { useLocalDB } from '@yakapa/shared';
import { Network, prisma } from '../generated/prisma-client';

export const useCurrentNetworks = (updatedId?: string) => {
  const [agentId] = useLocalDB<string>('agentId');
  const [networks, setNetworks] = useState<Network[] | undefined>(undefined);

  useEffect(() => {
    prisma
      .networks({
        where: {
          master: {
            id: agentId
          }
        }
      })
      .then(result => {
        setNetworks(result);
      });
  }, [agentId, updatedId]);

  return networks;
};
