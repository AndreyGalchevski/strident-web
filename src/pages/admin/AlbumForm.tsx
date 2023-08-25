import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Album, AlbumFormData } from "../../api/types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
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
  onSaveClick: (params: OnSaveClickParams<AlbumFormData>) => Promise<void>;
  isLoading?: boolean;
  initialData?: Album;
}

const AlbumForm: FunctionComponent<Props> = ({
  title,
  isSaving,
  onSaveClick,
  isLoading = false,
  initialData,
}) => {
  const isMobile = useMediaQuery();

  const [album, setAlbum] = useState<AlbumFormData>({
    name: "",
    url: "",
    year: 0,
  });

  const modal = useModal();

  useQueryResources("albums");

  useEffect(() => {
    if (initialData) {
      setAlbum({
        name: initialData.name,
        url: initialData.url,
        year: initialData.year,
      });
    }
  }, [initialData]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setAlbum({ ...album, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    try {
      await onSaveClick({ formData: album });
      modal.showModal({ modalType: "RESOURCE_SAVED", resourceName: "albums" });
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
                  onChange={handleFormChange}
                  value={album.name}
                />
                <Input
                  name="url"
                  type="text"
                  onChange={handleFormChange}
                  value={album.url}
                />
                <Input
                  name="year"
                  type="number"
                  onChange={handleFormChange}
                  value={album.year}
                />
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

export default observer(AlbumForm);
