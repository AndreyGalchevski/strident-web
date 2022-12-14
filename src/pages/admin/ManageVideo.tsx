import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Video } from "../../api/types";
import apiClient from "../../api/apiClient";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";

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

  const { data: videoData, isLoading } = useQuerySingleResource(
    "videos",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

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
      await apiClient.updateResource("videos", params.id, video);
    } else {
      await apiClient.createResource("videos", video);
    }
    modal.showModal({ modalType: "RESOURCE_CREATED", resourceName: "videos" });
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
                <Button handleClick={handleSaveClick}>Save</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default observer(ManageVideo);
