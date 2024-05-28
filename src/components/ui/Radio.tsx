import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RadioButton = ({ options, selectedOption, onSelect, label }:any) => {
    return (
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, fontSize: 16 }}>{label}</Text>
            {options.map((option:any) => (
                <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => onSelect(option.value)}
                        style={{
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 5,
                        }}
                    >
                        {selectedOption === option.value && (
                            <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#000',
                            }} />
                        )}
                    </TouchableOpacity>
                    <Text style={{ fontSize: 15 }}>{option.label}</Text>
                </View>
            ))}
        </View>
    );
};

export default RadioButton;
