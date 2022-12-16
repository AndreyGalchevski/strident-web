import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import { Masonry, MasonryBrick } from "../styled/Masonry";
import {
  Card,
  CardContent,
  CardTitle,
  CardImage,
  CardAction,
} from "../styled/Card";
import HalfwayTab from "../styled/HalfwayTab";
import Button from "../components/Button";
import Header from "../components/Header";
import Fab from "../components/Fab";
import Loader from "../components/Loader";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import ShoppingCartIcon from "../components/icons/ShoppingCart";
import useQueryResources from "../hooks/queries/useQueryResources";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import { formatCurrency } from "../utils/currency";

const PriceContainer = styled.p({
  display: "flex",
  FlexDirectionProperty: "row",
  justifyContent: "center",
});

const Merchandises: FunctionComponent = () => {
  const auth = useAuth();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: merchandiseData, isLoading: merchandiseLoading } =
    useQueryResources("merchandise");

  const modal = useModal();

  function handleUpdateClick(merchandiseID: string): void {
    navigate(`/admin/merchandise/edit/${merchandiseID}`);
  }

  function handleDeleteClick(merchandiseID: string): void {
    modal.showModal({
      modalType: "CONFIRM_DELETION",
      resourceID: merchandiseID,
      resourceName: "merchandise",
    });
  }

  return (
    <Container>
      <Header title="Merch" />
      {auth.isAuthenticated && <Fab url="/admin/merchandise/create" />}
      <Loader isLoading={merchandiseLoading}>
        <Masonry isMobile={isMobile}>
          {merchandiseData?.map((it) => (
            <MasonryBrick key={it.id}>
              <Card>
                <div>
                  <picture>
                    <source srcSet={it.image} type="image/jpeg" />
                    <CardImage src={it.image} alt="" />
                  </picture>
                </div>
                <HalfwayTab
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ bottom: 156 }}
                >
                  <ShoppingCartIcon style={{ marginTop: 8 }} />
                </HalfwayTab>
                <CardContent style={{ maxHeight: 184 }}>
                  <CardTitle>{it.name}</CardTitle>
                  <p>{it.type}</p>
                  <PriceContainer>
                    <span style={{ fontSize: 20 }}>
                      {formatCurrency(it.price)}
                    </span>
                  </PriceContainer>
                </CardContent>
                {auth.isAuthenticated && (
                  <CardAction>
                    <Button onClick={() => handleUpdateClick(it.id)}>
                      <EditIcon />
                    </Button>
                    <Button isPrimary onClick={() => handleDeleteClick(it.id)}>
                      <DeleteIcon />
                    </Button>
                  </CardAction>
                )}
              </Card>
            </MasonryBrick>
          ))}
        </Masonry>
      </Loader>
    </Container>
  );
};

export default Merchandises;
