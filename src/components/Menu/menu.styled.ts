import styled from "styled-components";

export const MenuWrapper = styled.div`
  height: 60px;
  background-color: var(--background-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  color: var(--text-color);
  gap: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Navigation = styled.div`
  display: flex;
  gap: 10px;
  color: var(--text-color);
`;

type NavigationOptionProps = {
  $disabled?: boolean;
};

export const NavigationOption = styled.div<NavigationOptionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ $disabled }) =>
      $disabled ? "transparent" : "rgba(255,255,255,0.1)"};
  }
  color: ${({ $disabled }) =>
    $disabled ? "rgba(255,255,255,0.5)" : "inherit"};
  ${({ $disabled }) => !$disabled && "cursor: pointer;"}
`;

export const CurrentPath = styled.span`
  width: 444px;
  min-height: 35px;
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const PathSpan = styled.span`
  cursor: pointer;
  color: var(--text-color);
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  overflow-wrap: break-word;
  white-space: nowrap;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2px 5px;
  border-radius: 5px;
`;

export const LogoutButton = styled.button`
  border: none;
  color: var(--text-color);
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #0a1329;
  color: #fff;
  height: var(--navBarHeight);
`;

export const RightOptionsWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
`;

export const LeftOptionsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const Divider = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
`;
