import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { Container, Group, Slider, Text } from '@mantine/core';
import { Title } from '@mantine/core';
import { AppShell, Navbar, Header } from '@mantine/core';
import { Button } from '@mantine/core';

export default function Home() {
  const [age, setAge] = useState(40);
  const [children, setChildren] = useState(0);

  const calcInitialPremium = () => {
    
  }

  return (
    <AppShell
      padding="md"
      navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{/* Navbar content */}</Navbar>}
      header={<Header height={60} p="xs">{<Title order={1}>NeoHealth Patient Portal</Title>}</Header>}
    >  

      <Container>
        <Group direction='row' grow>
          <Text size='md'>
            Age
          </Text>
          <Slider min={18} max={100} value={age} onChange={setAge}/>
        </Group>

        <Group direction='row' grow>
          <Text size='md'>
            Number of dependents covered by insurance plan
          </Text>
          <Slider min={0} max={10} value={children} onChange={setChildren}/>
        </Group>

        <Button onClick={() => console.log(age)}>
          Submit
        </Button>
      </Container>

    </AppShell>
  );
}
