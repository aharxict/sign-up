import { FormFieldStyles } from '../types/formTypes';
import { colors } from './colors';

export const getFieldStyles = ({
  isSuccess,
  isTouched = false,
  isError,
  isPasswordHint,
}: {
  isSuccess: boolean;
  isTouched?: boolean;
  isError: boolean;
  isPasswordHint: boolean;
}): FormFieldStyles => {
  if (isSuccess) {
    return {
      backgroundColor: colors.backgroundWhite,
      color: isPasswordHint ? colors.successGreenHint : colors.successGreen,
      border: `1px solid ${colors.successGreen}`,
      isDefault: false,
    };
  }

  if (isTouched && isError) {
    return {
      backgroundColor: colors.errorRedBackground,
      color: colors.errorRed,
      border: `1px solid ${colors.errorRed}`,
      isDefault: false,
    };
  }

  return {
    backgroundColor: colors.backgroundWhite,
    color: colors.textDefault,
    border: '1px solid transparent',
    isDefault: true,
  };
};
