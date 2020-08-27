'use strict';

export const isMobile = () => {
  const agentInfo = navigator.userAgent;
  const REGEX = /^(?=.*iPhone|Android|iPad).*$/;
  return REGEX.test(agentInfo);
};
