import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import {View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/auth/authProvider';

const TabsLayout = () => {

    const { user, loading } = useAuth();
        if(loading) {
            return (
                <View>
                    <Text> Cargando </Text>
                </View>
            )
        }

        if(!user) {
            return <Redirect href="login"/>
        }


    return <Tabs
        screenOptions={{
            headerShown: false,
        }}
    >
        <Tabs.Screen
            name="map"
            options={{
                title: 'Mapa',
                tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                ),
            }}
        />
        <Tabs.Screen
            name="stores"
            options={{
                title: 'Tiendas',
                tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons
                        name={focused ? 'pricetags' : 'pricetags-outline'}
                        size={size}
                        color={color}
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="favorites"
            options={{
                title: 'Favoritos',
                tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons
                        name={focused ? 'heart' : 'heart-outline'}
                        size={size}
                        color={color}
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Perfil',
                tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons
                        name={focused ? 'person' : 'person-outline'}
                        size={size}
                        color={color}
                    />
                ),
            }}
        />
    </Tabs>
};

export default TabsLayout;
