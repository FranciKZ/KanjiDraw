import React, { useEffect, useState } from 'react'
import { LayoutAnimation, Platform, StyleSheet, Text, UIManager, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from './Card';
Icon.loadFont();
interface ICollapsibleSectionProps {
    children: any;
    iconSize?: number;
}

export function CollapsibleSection({ children, iconSize = 30 }: ICollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(true);

    const onPress = () => {
        setIsOpen(!isOpen);
        LayoutAnimation.configureNext(LayoutAnimation.create(300, 'easeInEaseOut', 'opacity'));
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
    }, [])

    return (
        <Card>
            <TouchableWithoutFeedback style={isOpen ? style.touchableBorder : style.touchableNoBorder} onPress={onPress}>
                <Icon size={iconSize} name={isOpen ? 'expand-less' : 'expand-more'} /> 
                { children.slice(0, 1) }
            </TouchableWithoutFeedback>
            { isOpen && (
                <View style={style.childrenView}>
                    { children.slice(1) }
                </View>
            )}
        </Card>
    )
}

const style = StyleSheet.create({
    touchableNoBorder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    touchableBorder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(80, 80, 80, 0.5)'
    },
    childrenView: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    }
})