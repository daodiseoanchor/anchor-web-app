import { Wallet } from '@daodiseoanchor/icons';
import { ButtonBaseProps } from '@material-ui/core';
import { BorderButton } from '@libs/neumorphism-ui/components/BorderButton';
import { IconSpan } from '@libs/neumorphism-ui/components/IconSpan';
import React from 'react';
import styled from 'styled-components';

interface NotConnectedButtonProps extends ButtonBaseProps {}

export function NotConnectedButtonBase({
  children,
  ...buttonProps
}: NotConnectedButtonProps) {
  return (
    <BorderButton {...buttonProps}>
      <IconSpan>
        <span className="wallet-icon">
          <Wallet />
        </span>
        {children}
      </IconSpan>
    </BorderButton>
  );
}

export const NotConnectedButton = styled(NotConnectedButtonBase)`
  height: 26px;
  border-radius: 20px;
  padding: 4px 20px;
  font-size: 12px;
  font-weight: 700;

  .wallet-icon {
    svg {
      transform: scale(1.2) translateY(0.15em);
    }

    margin-right: 17px;

    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      bottom: 1px;
      right: -11px;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  color: ${({ theme }) => theme.colors.positive};
  border-color: ${({ theme }) => theme.colors.positive};

  &:hover {
    color: ${({ theme }) => theme.colors.positive};
    border-color: ${({ theme }) => theme.colors.positive};
  }
`;
