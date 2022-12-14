import {
  Button,
  Container,
  Grid,
  Input,
  Dropdown,
  Textarea,
  Text,
  Radio,
  Modal,
  Loading,
  Row,
} from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { supabase } from "../../../../utils/supabaseClient";

export default function NewAssignmentForm({}) {
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("Looks like there's nothing wrong here!");

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [date, setDate] = React.useState();
  const [assign, setAssign] = React.useState();
  const [subject, setSubject] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [files, setFiles] = React.useState([]);

  const [loading, setUploading] = React.useState(false);

  const resetForm = () => {
    setDate("");
    setAssign("");
    setSubject("");
    setTitle("");
    setDescription("");
    setFiles([]);
  }

  const handleSubmit = async (e) => {
    try {
      const inputData = {
        expiry: date,
        for: assign,
        subject: subject,
        title: title,
        description: description,
        upload: files,
        by: 123
      };

      let { error } = await supabase
        .from("Assignments")
        .insert([inputData]);

      if (error) throw error;

      setMessage("Assignment Added successfully!")
      setVisible(true);
      resetForm();

    } catch (error) {
      setMessage(error.message)
      setVisible(true);
      console.log(error);
    } finally {
    }
  };

  const handleUpload = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `/public/new/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      setFiles([...files, filePath]);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        css={{ m: 16 }}
      >
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={resetForm}>
            Reset
          </Button>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <form>
        <Grid.Container gap={1} justify="start">
          <Grid xs={7}>
            <Input
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            />
          </Grid>
          <Grid xs={12}>
            <Radio.Group
              label="Assign"
              defaultValue={assign}
              onChange={setAssign}
              size="sm"
            >
              <Grid.Container gap={0.5}>
                <Grid xs={4}>
                  <Radio value="801">801</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="901">901</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="101">101</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="111">111</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="121">121</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="121">121</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="1234">1234</Radio>
                </Grid>
              </Grid.Container>
            </Radio.Group>
          </Grid>
          <Grid xs={12}>
            <Radio.Group
              label="Subject"
              defaultValue={subject}
              onChange={setSubject}
              size="sm"
            >
              <Grid.Container gap={1}>
                <Grid xs={4}>
                  <Radio value="1">English</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="2">Hindi</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="3">Marathi</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="4">Science 1</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="5">Science 2</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="6">Maths 1</Radio>
                </Grid>
                <Grid xs={4}>
                  <Radio value="7">Maths 2</Radio>
                </Grid>
              </Grid.Container>
            </Radio.Group>
          </Grid>
          <Grid xs={7}>
            <Input
              label="Title:"
              placeholder="Next UI"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Textarea
              label="Description:"
              placeholder="Description: "
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Button
              bordered
              auto
              onClick={() => document.getElementById("upload").click()}
            >
              <input
                id="upload"
                type="file"
                style={{ display: "none" }}
                name="upload"
                onChange={handleUpload}
                disabled={loading ? true : false}
              />
              {loading ? <Loading type="points-opacity" /> : "Upload"}
            </Button>
          </Grid>
          <Grid xs={12} css style={{ overflow: "auto" }}>
            <Grid.Container>
              <Gallery>
                {files.map((url, index) => (
                  <Grid xs={6} sm={3} key={index}>
                    <Item
                      original={
                        "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                        url
                      }
                      thumbnail={
                        "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                        url
                      }
                      height="500px"
                      width="500px"
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={
                            "https://ktizceqawqwrzfntmmay.supabase.co/storage/v1/object/public/avatars/" +
                            url
                          }
                          style={{
                            width: "48vw",
                            margin: "1vw",
                            borderRadius: 10,
                          }}
                        />
                      )}
                    </Item>
                  </Grid>
                ))}
              </Gallery>
            </Grid.Container>
          </Grid>
          <Grid xs={12}>
            <Button onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid.Container>
      </form>
    </div>
  );
}
