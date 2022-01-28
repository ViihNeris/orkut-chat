import { Box, Button, TextField, Image, Text } from "@skynexui/components";
import appConfig from "../config.json";
import React from "react";
import { useRouter } from "next/router";

// function Titulo(props) {
//   const Tag = props.tag || 'h1';
//   return (
//     <>
//       <Tag>{props.children}</Tag>
//       <style jsx>{`
//             ${Tag} {
//                 color: ${appConfig.theme.colors.neutrals['000']};
//                 font-size: 24px;
//                 font-weight: 600;
//             }
//             `}</style>
//     </>
//   );
// }

// Componente React -> Teste
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle /> -> mudado para _app.js a fim de rodá-lo em todas as pages.
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
  // const username = 'ViihNeris';
  const [username, setUsername] = React.useState("ViihNeris");
  const route = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[900],
          backgroundImage: "url(https://i.pinimg.com/originals/77/55/12/775512d222eb9562371cf24ca66ff790.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            border: "2px solid #3D001F",
            backgroundColor: appConfig.theme.colors.neutrals["000"],
          }}
        >
          <Box
            as="form"
            onSubmit={function (infoDoEvento) {
              infoDoEvento.preventDefault();
              route.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Image
              styleSheet={{
                width: "130px",
              }}
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Logo_ORKUT.svg/1280px-Logo_ORKUT.svg.png"
              }
            />
            <Text
              variant="body3"
              styleSheet={{
                marginTop: "15px",
                marginBottom: "20px",
                color: appConfig.theme.colors.primary[100],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input 
                type="text" 
                value={username}
                onChange = {function (event){
                  // Visualizando no Console
                  console.log(event.target.value);
                  // Onde está o valor?
                  const valor = event.target.value
                  // Mudando o valor da variável
                  setUsername(valor);
                  
                  }
                }
                  /> */}

            <TextField
              value={username}
              fullWidth
              onChange={function (event) {
                // Visualizando no Console
                console.log(event.target.value);
                // Onde está o valor?
                const valor = event.target.value;
                // Mudando o valor da variável
                setUsername(valor);
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[600],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.primary[200],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[600],
                mainColorLight: appConfig.theme.colors.primary[900],
                mainColorStrong: appConfig.theme.colors.primary[800],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.primary[200],
              border: "1px solid",
              borderColor: appConfig.theme.colors.primary[400],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.primary[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
