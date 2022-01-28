import React from "react";
import { useRouter } from "next/router";

import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import appConfig from "../config.json";

import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI5MjU4OSwiZXhwIjoxOTU4ODY4NTg5fQ.YS3tWLs0wdy7ZhzUcrhrYf44Vdy98hCIESRX5s2VfLw";
const SUPABASE_URL = "https://sayuuqtqihrmlmchlxac.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const route = useRouter();
  const usuarioLogado = route.query.username;
  console.log("route.query: ", route.query);
  console.log("Usuario Logado: ", usuarioLogado);
  const [mensagem, setMensagem] = React.useState("");
  const [listaMensagens, setListaMensagens] = React.useState([]);

  function MensagensEmTempoReal(newMessage) {
    return supabaseClient
      .from("mensagens")
      .on("INSERT", (answerNewMessage) => {
        // console.log("Houve uma nova Mensagem");
        newMessage(answerNewMessage.new);
      })
      .subscribe();
  }

  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        // console.log("Dados da Consulta", data);
        setListaMensagens(data);
      });

    MensagensEmTempoReal((newMessage) => {
      console.log("Nova Mensagem: ", newMessage);
      setListaMensagens((valorAtualLista) => {
        return [newMessage, ...valorAtualLista];
      });
    });
  }, []);
  function handleNewMessage(novaMensagem) {
    const mensagem = {
      // id: listaMensagens.length + 1,
      text: novaMensagem,
      from: usuarioLogado,
    };

    supabaseClient
      .from("mensagens")
      .insert([
        // O objeto tem que conter os mesmos campos escritos no SUPABASE
        mensagem,
      ])
      .then(({ data }) => {
        console.log("Nova mensagem: ", data);
      });
    setMensagem("");
  }
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[700],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[999],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[800],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaMensagens} />
          {/* {listaMensagens.map((mensagemAtual) => {
            return (
              <li key ={mensagemAtual.id}>
              {mensagemAtual.from}: {mensagemAtual.text}
              </li>
              )
            })} */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valorMessage = event.target.value;
                setMensagem(valorMessage);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.primary[100],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals["000"],
              }}
            />
            {/* vvv Testando input vvv */}

            {/* <input
              type="submit"
              value="Enviar"
              onChange={(event) => {
                const valorMessage = event.target.value;
                setMensagem(valorMessage);
              }}
              onClick={(event) => {
                event.preventDefault();
                handleNewMessage(mensagem);
              }}
              styleSheet={{
                width: "100px",
                height: "44px",
                marginBottom: "8px",
                color: '#fff',
                fontStyle: 'italic',
              }}
              buttonColors={{
                mainColor: appConfig.theme.colors.primary[600],
              }}
            /> */}

            {/* vvv Callback vvv */}
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                console.log("Salvando Sticker no banco...");
                handleNewMessage(":sticker: " + sticker);
              }}
            />
            <Button
              label="Enviar"
              type="submit"
              value="Enviar"
              onChange={(event) => {
                const valorMessage = event.target.value;
                setMensagem(valorMessage);
              }}
              onClick={(event) => {
                event.preventDefault();
                handleNewMessage(mensagem);
              }}
              styleSheet={{
                width: "80px",
                height: "44px",
                margin: "0 0 8px 5px",
                color: "#fff",
                fontStyle: "italic",
              }}
              buttonColors={{
                mainColor: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: appConfig.theme.colors.primary[100],
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
          styleSheet={{
            color: appConfig.theme.colors.primary[700],
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props, mensagens) {
  console.log(props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[900],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "9px",
              }}
            >
              <Image
                styleSheet={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "5px 10px 0 0",
                }}
                src={`https://github.com/${mensagem.from}.png`}
              />

              <Text
                tag="strong"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[100],
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {mensagem.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.primary[800],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
                {/* 
                <Button
                type="button"
                label="teste"
                onClick={()=> handleDelete(mensagem.id)}
                styleSheet={{
                  width: "40px",
                  height: "15px",
                  color: "#fff",
                  fontStyle: "italic",
                  marginLeft: "15px",
                }}
                buttonColors={{
                  mainColor: appConfig.theme.colors.primary[600],
                }}
              /> */}
              </Text>
            </Box>
            <Text styleSheet={{ color: appConfig.theme.colors.neutrals[100] }}>
              {mensagem.text.startsWith(":sticker:") ? (
                <Image
                  styleSheet={{
                    width: "150px",
                    marginLeft: "25px",
                  }}
                  src={mensagem.text.replace(":sticker:", "")}
                />
              ) : (
                mensagem.text
              )}
            </Text>
          </Text>
        );
      })}
    </Box>
  );
}
