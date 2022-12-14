import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Video } from "../../api/types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";
import useQueryResources from "../../hooks/queries/useQueryResources";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageVideo: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const params = useParams<{ id: string }>();

  const [video, setVideo] = useState<Video>({
    id: "",
    name: "",
    url: "",
  });

  const modal = useModal();

  useQueryResources("videos");

  const { data: videoData, isLoading } = useQuerySingleResource(
    "videos",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: createResource } = useMutationCreateResource();
  const { mutateAsync: updateResource } = useMutationUpdateResource();

  useEffect(() => {
    if (videoData) {
      setVideo(videoData);
    }
  }, [videoData]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setVideo({ ...video, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "videos",
        resourceID: params.id,
        data: video,
      });
    } else {
      await createResource({ resourceName: "videos", data: video });
    }
    modal.showModal({ modalType: "RESOURCE_SAVED", resourceName: "videos" });
  }

  const action = params.id ? "Update" : "Create";

  return (
    <>
      <Container>
        <h2>{action} Video</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleFormChange}
                  value={video.name}
                />
                <Input
                  name="url"
                  type="text"
                  onChange={handleFormChange}
                  value={video.url}
                />
              </CardContent>
              <CardAction>
                <Button onClick={handleSaveClick}>Save</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default observer(ManageVideo);
