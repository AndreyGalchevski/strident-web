import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { Gig } from "../../api/types";
import {
  fetchResource,
  updateResource,
  createResource,
  uploadImage,
} from "../../api/utils";
import { formatDate, formatTime } from "../../utils/general";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Loader from "../../components/Loader";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageGig: FunctionComponent = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [gig, setGig] = useState<Gig>({
    id: "",
    name: "",
    venue: "",
    address: "",
    city: "",
    date: new Date(),
    fbEvent: "",
    image: "",
    imageNG: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideo(gigID: string): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Gig>("gigs", gigID);
      setGig({ ...resource, date: new Date(resource.date) });
      setLoading(false);
    }

    if (params.id) {
      fetchVideo(params.id);
    }
  }, [params.id]);

  useEffect(() => {}, []);

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setGig({ ...gig, [name]: value });
  }

  function handleDateInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setGig({ ...gig, date: new Date(value) });
  }

  function handleTimeInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setGig({ ...gig, date: new Date(`${formatDate(gig.date)} ${value}`) });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target?.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSaveClick(): Promise<void> {
    setLoading(true);

    let imageURL = "";
    let ngImageURL = "";

    if (selectedFile) {
      const image = new FormData();
      image.append("gigImage", selectedFile);
      try {
        const fileName = `${gig.venue.replace(/ /g, "")}-${formatDate(
          gig.date
        )}`;
        const result = await uploadImage("gigs", fileName, image);
        imageURL = result.imageURL;
        ngImageURL = result.ngImageURL;
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    if (imageURL && ngImageURL) {
      gig.image = imageURL;
      gig.imageNG = ngImageURL;
    }

    if (params.id) {
      await updateResource<Gig>("gigs", params.id, gig);
    } else {
      await createResource<Gig>("gigs", gig);
    }

    setLoading(false);
    navigate("/gigs");
  }

  const action = params.id ? "Update" : "Create";

  return (
    <>
      <Container>
        <h2>{action} Gig</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleTextInputChange}
                  value={gig.name}
                />
                <Input
                  name="venue"
                  type="text"
                  onChange={handleTextInputChange}
                  value={gig.venue}
                />
                <Input
                  name="address"
                  type="text"
                  onChange={handleTextInputChange}
                  value={gig.address}
                />
                <Input
                  name="city"
                  type="text"
                  onChange={handleTextInputChange}
                  value={gig.city}
                />
                <Input
                  name="date"
                  type="date"
                  onChange={handleDateInputChange}
                  value={formatDate(gig.date)}
                />
                <Input
                  name="date"
                  type="time"
                  onChange={handleTimeInputChange}
                  value={formatTime(gig.date)}
                />
                <Input
                  name="fbEvent"
                  type="text"
                  onChange={handleTextInputChange}
                  value={gig.fbEvent}
                />
                <FileInput onChange={handleImageChange} />
              </CardContent>
              <CardAction>
                <Button handleClick={handleSaveClick}>Save</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default ManageGig;
