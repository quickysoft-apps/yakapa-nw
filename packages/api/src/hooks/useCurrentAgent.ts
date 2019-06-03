import { useState, useEffect } from 'react';
import { useLocalDB } from '@yakapa/shared';
import { prisma, Agent } from '../generated/prisma-client';

export const useCurrentAgent = () => {
  const [agentId] = useLocalDB<string>('agentId');
  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  useEffect(() => {
    prisma.agent({ id: agentId }).then(result => {
      setAgent(result);
    });
  }, [agentId]);

  //const setCurrentAgent = () => {//TODO};

  return agent;
};
