import React, { useEffect, useState } from 'react'
import { LayoutAnimation, Platform, StyleSheet, Text, UIManager, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
interface ICollapsibleSectionProps {
    children: any;
    iconSize?: number;
}

export function CollapsibleSection({ children, iconSize = 30 }: ICollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(true);

    const onPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
    }, [])

    return (
        <View style={style.container}>
            <TouchableWithoutFeedback style={style.touchable} onPress={onPress}>
                <Icon size={iconSize} name={isOpen ? 'expand-less' : 'expand-more'} /> 
                { children.slice(0, 1) }
            </TouchableWithoutFeedback>
            { isOpen && (
                <View style={style.childrenView}>
                    { children.slice(1) }
                </View>
            )}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    touchable: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(80, 80, 80, 0.5)'
    },
    childrenView: {
        marginTop: 10,
        marginBottom: 10
    }
})