import { useState } from "react";
import { Container, Group, LoadingOverlay, Slider, Text } from "@mantine/core";
import { Title } from "@mantine/core";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Button } from "@mantine/core";
import Moralis from "moralis";
import { useEffect } from "react";
import {
  moralisAppID as appId,
  moralisServerURL as serverUrl,
  contractAddress,
  contractABI as ABI,
} from "../config";

export default function Home() {
  const [age, setAge] = useState(40);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [premium, setPremium] = useState("");

  // authenticate Moralis with Metamask. so we can execute smart contracts with Moralis later
  async function login() {
    let user = Moralis.User.current();
    try {
      user = await Moralis.authenticate({ signingMessage: "Authenticate" });
      console.log(user);
      console.log(user.get("ethAddress"));
    } catch (error) {
      console.log(error);
    }
  }

  // Hook runs as soon as website loads, requesting user to log in with Metamask
  useEffect(() => {
    Moralis.start({ appId, serverUrl });
    login();
  }, []);

  async function calculatePremium() {
    console.log("Age: " + age);
    console.log("ChildrenCovered: " + children);
    // Pass in age and number of children covered to TestifInsurable smart contract function.
    // This computes a premium amount, if they can be covered
    let testIfInsurable = {
      contractAddress: contractAddress,
      functionName: "TestifInsurable",
      abi: ABI,
      params: {
        age: age,
        ChildrenCovered: children,
      },
    };
    // Start executing the contract, can take ~60 seconds
    const transaction = await Moralis.executeFunction(testIfInsurable);

    // set state to loading to have user wait for premium to return
    setLoading(true);

    // wait for contract to be finished.  so that we can get the premium
    const result = await transaction.wait();

    let getPremium = {
      contractAddress: contractAddress,
      functionName: "returnStringPremium",
      abi: ABI,
    };

    // Call another smart contract to return premium as a string (hotfix)
    const premium = await Moralis.executeFunction(getPremium);
    console.log(premium);

    // set state with premium to ask user to pay
    setLoading(false);
    setPremium(premium);
  }

  const StartPage = () => {
    return (
      <Container>
        <LoadingOverlay visible={loading} />
        <Group direction="row" grow>
          <Text size="md">Age</Text>
          <Slider min={18} max={100} value={age} onChange={setAge} />
        </Group>

        <Group direction="row" grow>
          <Text size="md">Number of dependents covered by insurance plan</Text>
          <Slider min={0} max={10} value={children} onChange={setChildren} />
        </Group>

        <Button onClick={calculatePremium}>Submit</Button>
      </Container>
    );
  };

  const CollectPremiumPage = () => {
    return (
      <Container>
        <Group spacing="lg" grow direction="column">
          <Title order={1}>Required Premium: {premium} NEOH</Title>
          <Title order={4}>
            For 1 adult (age {age}) and {children} dependents
          </Title>
          <Title order={3}>Payable to the following ETH address: </Title>
          <Title order={2}>0x1154c78e66ca0289639d9e20b31E813a4AE5f3C9</Title>
        </Group>
      </Container>
    );
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {<Title order={1}>NeoHealth Patient Portal</Title>}
        </Header>
      }
    >
      {premium === "" ? <StartPage /> : <CollectPremiumPage />}
    </AppShell>
  );
}
