import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Gig } from "../../api/types";
import { updateResource, createResource, uploadImage } from "../../api/utils";
import { formatDate, formatTime } from "../../utils/general";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageGig: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const params = useParams<{ id: string }>();

  const [gig, setGig] = useState<Gig>({
    id: "",
    name: "",
    venue: "",
    address: "",
    city: "",
    date: new Date(),
    fbEvent: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const modal = useModal();

  const { data: gigData, isLoading } = useQuerySingleResource(
    "gigs",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  useEffect(() => {
    if (gigData) {
      setGig({ ...gigData, date: new Date(gigData.date) });
    }
  }, [gigData]);

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
    let imageURL = "";

    if (selectedFile) {
      const image = new FormData();
      image.append("gigImage", selectedFile);
      try {
        const fileName = `${gig.venue.replace(/ /g, "")}-${formatDate(
          gig.date
        )}`;
        const result = await uploadImage("gigs", fileName, image);
        imageURL = result.imageURL;
      } catch (e) {
        modal.showModal({
          modalType: "ERROR",
          errorMessage: (e as Error).message,
        });
        return;
      }
    }

    if (imageURL) {
      gig.image = imageURL;
    }

    if (params.id) {
      await updateResource<Gig>("gigs", params.id, gig);
    } else {
      await createResource<Gig>("gigs", gig);
    }

    modal.showModal({ modalType: "RESOURCE_CREATED", resourceName: "gigs" });
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

export default observer(ManageGig);
