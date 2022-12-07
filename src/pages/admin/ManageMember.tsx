import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";

import { Member } from "../../api/types";
import {
  fetchResource,
  updateResource,
  createResource,
  uploadImage,
} from "../../api/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FileInput from "../../components/FileInput";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageMember: FunctionComponent = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [member, setMember] = useState<Member>({
    id: "",
    name: "",
    instrument: "",
    info: "",
    image: "",
    imageNG: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function fetchMember(memberID: string): Promise<void> {
    setLoading(true);
    const resource = await fetchResource("members", memberID);
    setMember(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (params.id) {
      fetchMember(params.id);
    }
  }, [params.id]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleSaveClick(): Promise<void> {
    setLoading(true);

    let res = "";
    let imageURL = "";
    let ngImageURL = "";

    if (selectedFile) {
      const image = new FormData();
      image.append("memberImage", selectedFile);
      try {
        const result = await uploadImage("members", member.name, image);
        imageURL = result.imageURL;
        ngImageURL = result.ngImageURL;
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    if (imageURL && ngImageURL) {
      member.image = imageURL;
      member.imageNG = ngImageURL;
    }

    if (params.id) {
      res = await updateResource<Member>("members", params.id, member);
    } else {
      res = await createResource<Member>("members", member);
    }

    setLoading(false);
    navigate("/members");
    window.alert(res);
  }

  const action = params.id ? "Update" : "Create";

  return (
    <>
      <Container>
        <h2>{action} Member</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleFormChange}
                  value={member.name}
                />
                <Input
                  name="instrument"
                  type="text"
                  onChange={handleFormChange}
                  value={member.instrument}
                />
                <Input
                  name="info"
                  type="text"
                  onChange={handleFormChange}
                  value={member.info}
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

export default ManageMember;
