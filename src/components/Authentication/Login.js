import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();

  const toast = useToast();

  const handleClick = () => {
    setShow(!show)
  }

  const submitHandler = async() => {
    setLoading(true);

    if(!email || !password){
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const {data} = await axios.post("/api/user/login", 
      {email, password},
      config
      );
      toast({
        title: "You are Logged In!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate('/chats')
      setEmail('')
      setPassword('')

    }catch(error){
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error);
      setLoading(false);
    }

  };

  return (
    <VStack spacing="5px" color="black">
    <FormControl id="email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        value={email}
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          placeholder="Enter Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button size="xs" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>


    <Button
      colorScheme="blue"
      width='100%'
      style={{marginTop: 15}}
      onClick={submitHandler}
      isLoading={loading}
    >
      Login
    </Button>
  </VStack>
  )
}

export default Login