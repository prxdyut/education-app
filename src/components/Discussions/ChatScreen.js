import { Grid, Text, Card, Container } from "@nextui-org/react";
import { supabase } from "../../../utils/supabaseClient";
import { useState, useEffect } from "react";
import Sent from "./Sent";
import Receive from "./Receive";

export default function DiscussionsChatScreen() {
  const [chatData, setChatData] = useState([]);

  const fetchChats = async () => {
    try {
      let { data, error } = await supabase
        .from("Chatroom")
        .select('user_id ( name, id ), created_at, content');

      if (error && status !== 406) {
        throw error;
      }

        setChatData(data);
    } catch (error) {
      console.log("Error loading chat data!");
      console.log(error);
    }
  };

  try {
    let { realtimeData, realtimeError } = supabase
      .channel("public:Chatroom")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Chatroom" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    if (realtimeError && status !== 406) {
      throw realtimeError;
    }

    if (realtimeData) {
      fetchChats();
    }
  } catch (realtimeError) {
    console.log("Error loading realtime data!");
    console.log(realtimeError);
  }

  fetchChats();
  return (
    <>
        <Grid.Container gap={1} justify="start" css={{ "@xs": { p: 0 } }}>
          <Grid sm={10} xs={12} css={{ flexDirection: "column" }}>
            <Grid.Container gap={0.5} justify="center" css={{ "@xs": { p: 0 } }}>
              {chatData.map((data) =>
              <>
                {data.user_id.id === 123 ? (
                  <Sent content={data.content} date={data.created_at} />
                ) : (
                  <Receive
                    date={data.created_at}
                    by={data.user_id.name}
                    content={data.content}
                  />
                )}
                </>
              )}
            </Grid.Container>
          </Grid>
        </Grid.Container>
    </>
  );
}