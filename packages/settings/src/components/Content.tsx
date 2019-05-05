import React, { useState } from 'react';
import { AgentSettings } from '../pages/AgentSettings';

enum Page {
  AgentSettings
}

export const Content = () => {
  const [page, setPage] = useState<Page>(Page.AgentSettings);
  return <>{page === Page.AgentSettings && <AgentSettings />}</>;
};
