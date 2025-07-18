import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function MyCard({ item }) {

  //DUNGF HOOK useNavigate ĐỂ CHUYỂN HƯỚNG
  const navigate = useNavigate();
  // khi ấn vào ảnh thì sẽ qua cardDetail
  const handleCardClick = () => {
    navigate(`/card/${item.id}`);
  }

  return (
    <Card style={{ width: '18rem' }}>
      {/* khi ấn vào ảnh thì sẽ qua cardDetail */}
      <Card.Img onClick={handleCardClick} variant="top" src={item.cardImage} />
      <Card.Body>
        <Card.Title>{item.cardName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.branch}</Card.Subtitle>
        <Card.Text>
          {item.price} {item.available}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}
