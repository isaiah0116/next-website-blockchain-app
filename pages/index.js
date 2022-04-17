import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Container, Group, Slider, Text } from "@mantine/core";
import { Title } from "@mantine/core";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Button } from "@mantine/core";
import Moralis from "moralis";
import { useEffect } from "react";

export default function Home() {
  const [age, setAge] = useState(40);
  const [children, setChildren] = useState(0);

  const ABI = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokens",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "InsuranceAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "uint256", name: "age", type: "uint256" },
        { internalType: "uint256", name: "ChildrenCovered", type: "uint256" },
      ],
      name: "TestifInsurable",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "tokenOwner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [
        { internalType: "uint256", name: "remaining", type: "uint256" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "tokens", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "tokenOwner", type: "address" },
      ],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
      name: "burn",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "burnfrom",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "from", type: "address" }],
      name: "collectInsuranceFunds",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "premium",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "returnPremium",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeAdd",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeDiv",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeMul",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "uint256", name: "a", type: "uint256" },
        { internalType: "uint256", name: "b", type: "uint256" },
      ],
      name: "safeSub",
      outputs: [{ internalType: "uint256", name: "c", type: "uint256" }],
      payable: false,
      stateMutability: "pure",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokens", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokens", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  async function login() {
    let user = Moralis.User.current();
    //console.log(user);
    try {
      user = await Moralis.authenticate({ signingMessage: "Authenticate" });
      console.log(user);
      console.log(user.get("ethAddress"));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const serverUrl = "https://x3ndg09zcrzz.usemoralis.com:2053/server";
    const appId = "HPqe3okZh1D0Yrzi7tydb8Yqq6T0WFJaXipvu0iA";
    Moralis.start({ serverUrl, appId });
    login();
  }, []);

  async function calcInitialPremium() {
    let options = {
      contractAddress: "0x7F078Fa33b2c8c62AAEE0E68480d722fabe621F5",
      functionName: "TestifInsurable",
      abi: ABI,
      params: {
        age: age,
        ChildrenCovered: children,
      },
    };
    //await Moralis.User.logOut();
    //await login();
    await Moralis.executeFunction(options);
  }

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
      <Container>
        <Group direction="row" grow>
          <Text size="md">Age</Text>
          <Slider min={18} max={100} value={age} onChange={setAge} />
        </Group>

        <Group direction="row" grow>
          <Text size="md">Number of dependents covered by insurance plan</Text>
          <Slider min={0} max={10} value={children} onChange={setChildren} />
        </Group>

        <Button onClick={calcInitialPremium}>Submit</Button>
      </Container>
    </AppShell>
  );
}
