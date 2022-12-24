import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Gig, GigFormData } from "../../api/types";
import { formatDate, formatTime } from "../../utils/general";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQueryResources from "../../hooks/queries/useQueryResources";
import { OnSaveClickParams } from "../../types";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

interface Props {
  title: string;
  isSaving: boolean;
  onSaveClick: (params: OnSaveClickParams<GigFormData>) => Promise<void>;
  isLoading?: boolean;
  initialData?: Gig;
}

const GigForm: FunctionComponent<Props> = ({
  title,
  isSaving,
  onSaveClick,
  isLoading = false,
  initialData,
}) => {
  const isMobile = useMediaQuery();

  const [gig, setGig] = useState<GigFormData>({
    name: "",
    venue: "",
    address: "",
    city: "",
    date: new Date(),
    fbEvent: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const modal = useModal();

  useQueryResources("gigs");

  useEffect(() => {
    if (initialData) {
      setGig({
        name: initialData.name,
        venue: initialData.venue,
        address: initialData.address,
        city: initialData.city,
        date: new Date(initialData.date),
        fbEvent: initialData.fbEvent,
      });
    }
  }, [initialData]);

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
    try {
      await onSaveClick({ formData: gig, image: selectedFile });
      modal.showModal({
        modalType: "RESOURCE_SAVED",
        resourceName: "gigs",
      });
    } catch (e) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: (e as Error).message,
      });
    }
  }

  return (
    <>
      <Container>
        <h2>{title}</h2>
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
                <Button
                  onClick={handleSaveClick}
                  isLoading={isSaving}
                  fullWidth
                >
                  Save
                </Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default observer(GigForm);
