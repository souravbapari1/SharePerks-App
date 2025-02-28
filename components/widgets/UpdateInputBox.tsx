import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  GestureResponderEvent,
  TextInputProps,
  ViewStyle,
  StyleProp,
  KeyboardTypeOptions,
} from "react-native";
import React, { memo, ReactNode } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import {
  DISABLE_COLOR,
  MAIN_COLOR,
  SECONDARY_COLOR,
} from "../../constants/colors";
const UpdateInputBox = ({
  value,
  onChange,
  onEditPress,
  disable,
  input,
  style,
  icon,
  showIcon = true,
  keyboardType,
}: {
  onEditPress?: ((event: GestureResponderEvent) => void) | undefined;
  value?: string | undefined;
  onChange?: ((text: string) => void) | undefined;
  disable?: boolean;
  input?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  icon?: ReactNode;
  showIcon?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
}) => {
  return (
    <View
      style={style}
      className="flex-row h-14 border-gray-200 rounded-2xl overflow-hidden pr-3 bg-white border items-center"
    >
      <TextInput
        autoComplete="off"
        className={"h-12 px-5 flex-1 " + (showIcon ? "mr-3" : null)}
        value={value}
        keyboardType={keyboardType}
        editable={!disable}
        onChangeText={onChange}
        cursorColor={MAIN_COLOR}
        // readOnly={disable}
        {...input}
      />
      {showIcon &&
        (icon || (
          <Octicons
            name="pencil"
            size={23}
            color={disable ? DISABLE_COLOR : SECONDARY_COLOR}
            onPress={disable ? undefined : onEditPress}
          />
        ))}
    </View>
  );
};

export default memo(UpdateInputBox);
