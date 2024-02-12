import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

export const ControllerInput = ({ control, name, placeholder, secureTextEntry, rules = {} }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onBlur, onChange }, fieldState: { error } }) => (
        <>
          <TextInput
            className={`border w-full px-[10px] py-[12px] rounded-md bg-gray-100 focus:border-indigo-500 transition-all duration-200 ease-in-out ${error ? 'border-red-700' : 'border-gray-300'}`}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
          />
          {error && <Text className="font-['Lato'] text-red-700 pt-[8px]">{error?.message}</Text>}
        </>
      )}
    />
  );
};
