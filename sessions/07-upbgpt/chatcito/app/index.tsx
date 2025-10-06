import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
      <Text category="h4">Bienvenido a Chatcito</Text>
      <Link href="/chat" asChild>
        <Button>Ingresar</Button>
      </Link>
    </Layout>
  );
}
