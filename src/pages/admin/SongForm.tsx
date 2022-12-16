import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";

import { Song } from "../../api/types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { observer } from "mobx-react-lite";
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
  onSaveClick: (params: OnSaveClickParams<Song>) => Promise<void>;
  isLoading?: boolean;
  initialData?: Song;
}

const SongForm: FunctionComponent<Props> = ({
  title,
  isSaving,
  onSaveClick,
  isLoading = false,
  initialData,
}) => {
  const isMobile = useMediaQuery();

  const [song, setSong] = useState<Song>({
    id: "",
    album: "",
    name: "",
    url: "",
  });

  const modal = useModal();

  useQueryResources("songs");

  useEffect(() => {
    if (initialData) {
      setSong(initialData);
    }
  }, [initialData]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setSong({ ...song, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    try {
      await onSaveClick({ formData: song });
      modal.showModal({ modalType: "RESOURCE_SAVED", resourceName: "songs" });
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
                  value={song.name}
                />
                <Input
                  name="url"
                  type="text"
                  onChange={handleFormChange}
                  value={song.url}
                />
                <Input
                  name="album"
                  type="text"
                  onChange={handleFormChange}
                  value={song.album}
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

export default observer(SongForm);
