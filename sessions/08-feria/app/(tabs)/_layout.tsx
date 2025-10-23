import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
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
