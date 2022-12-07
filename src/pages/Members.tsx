import { FunctionComponent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deleteResource } from "../api/utils";
import { useAuthContext } from "../context/authContext";
import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import {
  Card,
  CardTitle,
  CardContent,
  CardImage,
  CardAction,
} from "../styled/Card";
import Button from "../components/Button";
import Header from "../components/Header";
import Fab from "../components/Fab";
import Loader from "../components/Loader";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import useQueryMembers from "../hooks/useQueryMembers";

const MembersContainer = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  WebkitFlexDirection: isMobile ? "column" : "row",
}));

const MemberItem = styled.div({
  paddingRight: "2vh",
  paddingLeft: "2vh",
});

const Members: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const { data: membersData, isLoading: membersLoading } = useQueryMembers();

  function handleUpdateClick(memberId: string): MouseEventHandler {
    return (): void => {
      navigate(`/admin/members/edit/${memberId}`);
    };
  }

  function handleDeleteClick(memberId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm("Are you sure you want to delete the member?")) {
        const res = await deleteResource("members", memberId);
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Members" />
      {authState.isAuthenticated && <Fab url="/admin/members/new" />}
      <Loader isLoading={membersLoading}>
        <MembersContainer isMobile={isMobile}>
          {membersData?.map((member) => (
            <MemberItem key={member.id}>
              <Card>
                <div>
                  <picture>
                    <source srcSet={member.imageNG} type="image/webp" />
                    <source srcSet={member.image} type="image/jpeg" />
                    <CardImage src={member.image} alt="" />
                  </picture>
                </div>
                <CardContent>
                  <CardTitle>{member.name}</CardTitle>
                  <p>{member.instrument}</p>
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(member.id)}>
                      <EditIcon />
                    </Button>
                    <Button
                      isPrimary
                      handleClick={handleDeleteClick(member.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardAction>
                )}
              </Card>
            </MemberItem>
          ))}
        </MembersContainer>
      </Loader>
    </Container>
  );
};

export default Members;
