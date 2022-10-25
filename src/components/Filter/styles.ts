import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type FiltersStyleProps = {
  isActive?: boolean;
};

export const Container = styled(TouchableOpacity)<FiltersStyleProps>`
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_700};
    `}

  border-radius: 4px;
  margin-right: 12px;

  height: 38px;
  width:70px;
  
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  text-transform: uppercase; /* força o texto a ser maiusculo */
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZE.SM}px;
      font-family: ${theme.FONT_FAMILY.BOLD};
      color: ${theme.COLORS.WHITE};
    `}
`;
