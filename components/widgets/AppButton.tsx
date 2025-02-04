import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { cn } from "../../lib/cn";

interface AppButtonProps {
  loading?: boolean;
  onClick?: () => void;
  buttonText: string;
  disabled?: boolean;
  className?: string; // You can allow custom styling via props
}

const AppButton: React.FC<AppButtonProps> = ({
  loading,
  onClick,
  buttonText,
  disabled = false,
  className = "",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        "authBtn mt-6 mb-3",
        loading ? "bg-disable" : "bg-primary", // Assuming 'bg-primary' for default button
        className
      )}
      disabled={loading || disabled}
      onPress={onClick}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-white text-center font-bold">{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
